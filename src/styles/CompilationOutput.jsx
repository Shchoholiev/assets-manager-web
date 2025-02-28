import styled from "styled-components";

const CompilationOutput = styled.textarea`
  resize: none;
  overflow: scroll;
  background-color: var(--gray-500);
  height: 10rem;
  border: none;
  color: var(--yellow);
  border-radius: var(--border-radius-m);
  padding: 2rem 1rem;
  font-size: 15px;
  font-style: italic;
  width: ${(props) => props.width || "auto"};
  &:disabled {
    cursor: default;
  }
  &::placeholder {
    color: var(--gray-200);
  }
  @media (max-width: 425px) {
    font-size: 13px;
  }
`;
export default CompilationOutput;
