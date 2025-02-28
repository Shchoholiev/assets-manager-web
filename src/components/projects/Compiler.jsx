import styled from "styled-components";
import Button from "../../styles/Button";
import Buttons from "../../styles/Buttons";
import CodeComponent from "../assets/CodeComponent";
import { useCombinedProject } from "./useCombinedProject";
import { useNavigate, useParams } from "react-router-dom";
import CompilationOutput from "../../styles/CompilationOutput";
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
  width: 20%;
`;
function Compiler() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { combinedProject } = useCombinedProject();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleCompile = async () => {
    setLoading(true);
    setMessage("");
    try {
      const result = await compileProject({ id });
      setMessage(
        result.error || result.output || "// COMPILATION SUCCESSFUL !"
      );
    } catch (error) {
      setMessage("Compilation failed. Please try again.");
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
      <CompilationOutput
        placeholder="// press the button to compile"
        value={message}
        disabled={true}
      />
      <Buttons>
        <Button
          variation="primary"
          disabled={!message}
          onClick={handleDownload}
        >
          {downloading ? <Spinner /> : "DOWNLOAD ZIP"}
        </Button>
        <Button
          variation="secondary"
          onClick={() => navigate("/project/start")}
        >
          CHANGE PROMPT
        </Button>
      </Buttons>
    </CompilerContainer>
  );
}

export default Compiler;
