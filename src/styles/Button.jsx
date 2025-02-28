import styled, { css } from "styled-components";

const variations = {
  auth: css`
    background-color: var(--teal);
    box-shadow: 0px 0px 30px var(--teal-shadow);
    margin-top: 2%;
    &:hover {
      background-color: var(--dark-teal);
      color: var(--yellow);
      transition: ease-in-out 300ms;
    }
  `,
  primary: css`
    background-color: var(--teal);
    color: var(--yellow);
    &:hover {
      box-shadow: 0px 0px 20px var(--teal-shadow);
      background-color: var(--dark-teal);
      transition: ease-in-out 300ms;
    }
    &:disabled{
      background-color: var(--gray-400);
      color: var(--grey-100);
      box-shadow: none;
    }
  `,
  icon: css`
    background: none;
    color: var(--gray-100);
    &:hover {
      color: var(--white);
      transition: ease-in-out 300ms;
    }
    & svg{
      width: 1.4rem;
      height: 1.4rem;
    }
  `,
  secondary: css`
    background-color: var(--gray-600);
    color: var(--black);
    &:hover {
      background-color: var(--gray-300);
      transition: ease-in-out 300ms;
    }
  `
};
const Button = styled.button`
  border: none;
  color: var(--black);
  border-radius: var(--border-radius-m);
  padding: 0.6rem;
  font-size: 15px;
  font-weight: bolder;
  width: ${(props) => props.width || "auto"};
  ${(props) => variations[props.variation]}

  @media (max-width: 425px) {
    font-size: 13px;
  }
`;
export default Button;
