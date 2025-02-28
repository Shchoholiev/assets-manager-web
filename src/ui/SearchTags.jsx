import { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledSearchInput = styled.input`
  width: 100%;
  border: none;
  background-color: var(--gray-400);
  border-radius: var(--border-radius-s);
  padding: 0.6rem 1rem;
  font-size: 15px;
  color: var(--gray-200);
  &::placeholder {
    color: var(--gray-200);
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
function SearchTags() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("searchTags") || "");
  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);

    setSearchParams({ searchTags: newSearch });
  };

  return (
    <Container>
      <StyledSearchInput
        placeholder="Search tags..."
        value={search}
        onChange={handleSearchChange}
      />
      <StyledSearchIcon />
    </Container>
  );
}
export default SearchTags;
