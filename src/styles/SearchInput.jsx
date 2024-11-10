import { HiOutlineSearch } from "react-icons/hi";
import styled from "styled-components";

const StyledSearchInput = styled.input`
  border: none;
  background-color: var(--gray-400);
  border-radius: var(--border-radius-s);
  padding: 0.6rem 1rem;
  width: 50vw;
  font-size: 15px;
  color: var(--gray-200);
  &::placeholder {
    color: var(--gray-200);
  }

  @media (max-width: 1024px) {
    width: 40vw;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 425px) {
    font-size: 13px;
  }
  @media (max-width: 320px) {
    font-size: 12px;

  }
`;
const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: end;
`;
const StyledSearchIcon = styled(HiOutlineSearch)`
  position: absolute;
  top: 50%;
  margin-right: 2%;

  transform: translateY(-50%);
`;
function SearchInput() {
  return (
    <Container>
      <StyledSearchInput placeholder="Search code assets..." />
      <StyledSearchIcon />
    </Container>
  );
}

export default SearchInput;
