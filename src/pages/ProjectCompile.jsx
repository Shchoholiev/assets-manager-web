import { HiDownload } from "react-icons/hi";
import PageTitle from "../ui/PageTitle";
import styled from "styled-components";
import Compiler from "../components/projects/Compiler";
import { ActiveFileProvider } from "../context/ActiveFileContext";
import { useCombinedProject } from "../components/projects/useCombinedProject";
import { useDefineMonacoTheme } from "../hooks/useDefineMonacoTheme";
import PageSpinnerContainer from "../styles/PageSpinnerContainer";
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
function ProjectCompile() {
      useDefineMonacoTheme();
  
    const { isPending } = useCombinedProject();
    if (isPending)
      return (
        <PageSpinnerContainer />
      );
  return (
    <ActiveFileProvider>
      <Container>
        <PageTitle>
          <HiDownload />
          <p>DOWNLOAD PROJECT</p>
        </PageTitle>
        <Compiler />
      </Container>
     </ActiveFileProvider>
  );
}

export default ProjectCompile;
