import styled from "styled-components";

const StyledTag = styled.div.withConfig({
  shouldForwardProp: (prop)=> prop !== "isMain"
})`
  font-size: 16px;
  width: fit-content;
  padding: 0.4rem 1.2rem;
  background-color: var(--gray-400);
  border-radius: var(--border-radius-s);
  text-align: center;
  color: ${({isMain})=> isMain ? "var(--teal)" : "var(--yellow)" };
  @media (max-width: 768px) {
    font-size: 14px;
  }
  
`;

function Tag({ name, isMain  = false}) {
  return <StyledTag isMain={isMain}>{name}</StyledTag>;
}

export default Tag;
