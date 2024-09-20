import styled from "styled-components";

const Input = styled.input`
  border: none;
  background-color: var(--gray-100);
  border-radius: var(--border-radius-m);
  padding: 1rem 1.2rem;
  font-size: 15px;
  color: var(--black);
  &::placeholder{
    color: var(--black);
  }
  @media (max-width: 1024px) {
    padding: 0.8rem 1rem;
    font-size: 14px;
  }

`;

export default Input