import { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
  &:disabled {
    background-color: var(--gray-600);
  }

  @media (max-width: 1024px) {
    width: 45vw;
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
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const StyledSearchIcon = styled(HiOutlineSearch)`
  position: absolute;
  top: 50%;
  margin-right: 2%;

  transform: translateY(-50%);
`;
function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const validPaths = ["/assets", "/my-assets", "/company-assets"];
  const isDisabled = !validPaths.includes(location.pathname);
  // Handle search input change
  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);

    setSearchParams({ search: newSearch });
  };

  return (
    <Container>
      <StyledSearchInput
        placeholder="Search code assets..."
        value={search}
        onChange={handleSearchChange}
        disabled={isDisabled}
      />
      <StyledSearchIcon />
    </Container>
  );
}
export default SearchInput;
