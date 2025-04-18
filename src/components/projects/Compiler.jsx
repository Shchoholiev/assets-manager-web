import styled from "styled-components";
import Button from "../../styles/Button";
import Buttons from "../../styles/Buttons";
import CodeComponent from "../assets/CodeComponent";
import { useNavigate, useParams } from "react-router-dom";
import { Line, OutputContainer } from "../../styles/CompilationOutput";
import { useState } from "react";
import { compileProject, downloadZip } from "../../services/apiProjects";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";

const CompilerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
const CompileButton = styled(Button)`
  align-self: end;
  width: 30%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledButtons = styled(Buttons)`
  @media (max-width: 425px) {
    grid-gap: 0.5rem;
    grid-template-columns: 1fr 0.7fr;
  }
  @media (max-width: 320px) {
    grid-template-columns: 1fr;
  }
`;
const parseOutput = (output) => {
  const lines = output.split("\n");

  const errorRegex = /\berror\s+CS\d+/i;
  const warningRegex = /\bwarning\s+CS\d+/i;
  const successRegex = /(build succeeded|compilation successful)/i;

  return lines.map((line, i) => {
    let type = "info";

    if (errorRegex.test(line)) {
      type = "error";
    } else if (warningRegex.test(line)) {
      type = "warning";
    } else if (successRegex.test(line)) {
      type = "success";
    }

    return { id: i, content: line, type };
  });
};

function Compiler() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleCompile = async () => {
    setLoading(true);
    setMessage("");
    try {
      const result = await compileProject({ id });
      setMessage(result.output);
    } catch (error) {
      console.error("Compilation error:", error);
      if (error.data?.output) {
        setMessage(error.data.output);
      } else {
        setMessage(error.message || "Compilation failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadZip({ id });
    } catch (error) {
      toast.error("Something went wrong! Try again later!");
    } finally {
      setDownloading(false);
    }
  };
  return (
    <CompilerContainer>
      <CodeComponent readOnly={false} />
      <CompileButton variation="primary" onClick={handleCompile}>
        {loading ? <Spinner /> : "COMPILE"}
      </CompileButton>
      <OutputContainer>
        {loading
          ? "// compiling..."
          : message
          ? parseOutput(message).map((line) => (
              <Line key={line.id} type={line.type}>
                {line.content}
              </Line>
            ))
          : "// press the button to compile"}
      </OutputContainer>

      <StyledButtons>
        <Button variation="primary" onClick={handleDownload}>
          {downloading ? <Spinner /> : "DOWNLOAD ZIP"}
        </Button>
        <Button
          variation="secondary"
          onClick={() => navigate("/project/start")}
        >
          CHANGE PROMPT
        </Button>
      </StyledButtons>
    </CompilerContainer>
  );
}

export default Compiler;
