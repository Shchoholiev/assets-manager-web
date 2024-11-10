import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 0.6fr 0.4fr;
  grid-gap: 2%;
  @media (max-width: 1024px) {
    grid-template-columns: 0.9fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Error = styled.span`
  font-size: 15px;
  color: var(--pink);
`;

function FormRow({ error, children }) {
  return (
    <StyledFormRow>
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
