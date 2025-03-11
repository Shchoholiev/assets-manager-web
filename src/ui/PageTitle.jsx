import styled from "styled-components";

const Title = styled.div`
  margin-top: ${({ leftAlign }) => !leftAlign && "3%"};
  display: flex;
  align-items: center;
  justify-content: ${({ leftAlign }) => (leftAlign ? "flex-start" : "center")};
  gap: 10px;
  font-size: 24px;
  font-weight: bold;
  color: var(--white);
  @media (max-width: 768px) {
    font-size: 20px;
    justify-content: center;
  }
  @media (max-width: 425px) {
    font-size: 18px;
  }
`;
function PageTitle({ children, leftAlign = false }) {
  return <Title leftAlign={leftAlign}>{children}</Title>;
}

export default PageTitle;
