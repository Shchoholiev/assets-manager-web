import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
const StyledLink = styled(Link)`
    font-size: 17px;
    display: flex;
    align-items: center;
    gap: 2px;
    color: var(--yellow);
    cursor: pointer;
`
function PageNotFound() {
  return (
    <Container>
      <p>404 Page not found</p>
      <StyledLink to={-1}><HiArrowLongLeft />Go back </StyledLink>
    </Container>
  );
}

export default PageNotFound;
