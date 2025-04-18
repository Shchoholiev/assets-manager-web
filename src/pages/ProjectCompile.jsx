import { HiDownload } from "react-icons/hi";
import PageTitle from "../ui/PageTitle";
import styled from "styled-components";
import Compiler from "../components/projects/Compiler";
import { ActiveFileProvider } from "../context/ActiveFileContext";
import { useDefineMonacoTheme } from "../hooks/useDefineMonacoTheme";
import PageSpinnerContainer from "../styles/PageSpinnerContainer";
import { useAsset } from "../components/assets/useAsset";
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
function ProjectCompile() {
  useDefineMonacoTheme();

  const { isPending } = useAsset();
  if (isPending) return <PageSpinnerContainer />;
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
