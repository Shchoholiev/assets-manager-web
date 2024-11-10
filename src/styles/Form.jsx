import styled from "styled-components";

const Form = styled.form`
  display: grid;
  grid-gap: 5%;
  width: 80%;
  @media (max-width: 1024px) {
    width: 100%;
  }
  @media (max-width: 768px) {
    width: 60%;
  }
  @media (max-width: 425px) {
    width: 80%;
  }
`;
export default Form;
