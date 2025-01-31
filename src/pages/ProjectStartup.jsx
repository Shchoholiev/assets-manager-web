import styled from "styled-components";
import { HiOutlineCube } from "react-icons/hi";
import PageTitle from "../ui/PageTitle";
import Prompt from "../components/projects/Prompt";
import AiProjects from "../components/projects/AiProjects";
import { useDefineMonacoTheme } from "../hooks/useDefineMonacoTheme";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

function ProjectStartup() {
  useDefineMonacoTheme();

  return (
    <Container>
      <PageTitle>
        <HiOutlineCube />
        <p>START PROJECT</p>
      </PageTitle>

      <Prompt />
      <AiProjects />
    </Container>
  );
}

export default ProjectStartup;
