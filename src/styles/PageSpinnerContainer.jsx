import styled from "styled-components";
import Spinner from "../ui/Spinner";
const SpinnerContainer = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  padding-top: 20%;
`;
function PageSpinnerContainer() {
  return (
    <SpinnerContainer>
      <Spinner size="60" />
    </SpinnerContainer>
  );
}

export default PageSpinnerContainer;
