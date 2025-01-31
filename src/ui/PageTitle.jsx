import styled from "styled-components";

const Title = styled.div`
  margin-top: 3%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 24px;
  font-weight: bold;
  color: var(--white);
`;
function PageTitle({children}) {
  return <Title>{children}</Title>;
}

export default PageTitle;
