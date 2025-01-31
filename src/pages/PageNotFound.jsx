import styled from "styled-components";
import GoBackButton from "../ui/GoBackButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5%;
  justify-content: center;
  height: 50rem;
  align-items: center;
  font-size: 30px;
  font-weight: bolder;
`;

function PageNotFound() {
  return (
    <Container>
      <p>404 Page not found</p>
      <GoBackButton />
    </Container>
  );
}

export default PageNotFound;
