import styled from "styled-components";
export const OutputContainer = styled.div`
  background-color: var(--gray-600);
  height: 15rem;
  overflow-y: auto;
  overflow-x: hidden; /* Prevents horizontal scrolling */
  border-radius: var(--border-radius-m);
  padding: 1.5rem;
  font-size: 13px;
  font-family: monospace;
  white-space: pre-wrap;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  color: var(--yellow);
  width: 100%; 
  box-sizing: border-box; 

  @media (max-width: 425px) {
    padding: 1rem;
    font-size: 11px;
  }
  @media (max-width: 320px) {
    padding: 0.8rem;
    font-size: 9px;
  }
`;

export const Line = styled.div`
  color: ${(props) =>
    props.type === "error"
      ? "var(--red)"
      : props.type === "warning"
      ? "var(--pink)"
      : "var(--yellow)"};
  font-style: ${(props) => (props.type === "info" ? "italic" : "normal")};
`;
