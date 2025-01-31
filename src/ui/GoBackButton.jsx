import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
    font-size: 17px;
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 2px;
    color: var(--yellow);
    cursor: pointer;
    @media (max-width: 768px) {
     font-size: 14px;
    
  }
`
function GoBackButton() {
  return (
    <StyledLink to={-1}>
      <HiArrowLongLeft />
      Go back{" "}
    </StyledLink>
  );
}

export default GoBackButton;
