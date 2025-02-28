import styled from "styled-components";

const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.2fr;
  grid-gap: 2rem;
  @media (max-width: 1100px) {
  grid-template-columns: 1fr 0.35fr;
    
  }
`;
export default Buttons;
