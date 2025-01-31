import { HiDownload } from "react-icons/hi";
import PageTitle from "../ui/PageTitle";
import styled from "styled-components";
import Compiler from "../components/projects/Compiler";
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
function ProjectCompile() {
  return (
    <Container>
      {/* <GoBackButton /> */}
      <PageTitle>
        <HiDownload />
        <p>DOWNLOAD PROJECT</p>
      </PageTitle>
      <Compiler />
      
    </Container>
  );
}

export default ProjectCompile;
