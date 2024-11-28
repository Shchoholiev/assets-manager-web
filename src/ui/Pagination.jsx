import { useSearchParams } from "react-router-dom";
import { useAssets } from "../components/assets/useAssets";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PaginationContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-self: center;
  color: var(--dark-teal);
  @media (max-width: 768px) {
    font-size: 14px;
    gap: 0.2rem;
  }
`;

const Page = styled.button.withConfig({
  shouldForwardProp: prop => prop !== "isActive" && prop !== "isDisabled"

})`
  background-color: ${(props) =>
    props.isActive ? "var(--teal)" : "transparent"};
  color: ${(props) => (props.isActive ? "var(--yellow)" : "var(--teal)")};
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  visibility: ${(props) => (props.isDisabled ? "hidden" : "visible")};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: var(--yellow);
    background-color: var(--teal);
  }
`;

function Pagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage =
    !searchParams.get("page") || Number(searchParams.get("page")) < 1
      ? 1
      : Number(searchParams.get("page"));
  const {
    assets: { totalPages },
  } = useAssets();

  const handlePageClick = (page) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      searchParams.set("page", page);
      setSearchParams(searchParams);
    }
  };

  if (totalPages <= 1) return null;

  const generatePagination = () => {
    const pageNumbers = [];

    pageNumbers.push(1);

    if (totalPages > 5) {
      if (currentPage <= 3) {
        pageNumbers.push(2, 3, 4, 5, "...");
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1
        );
      } else {
        pageNumbers.push(
          "...",
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
          "..."
        );
      }
    } else {
      for (let i = 2; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    }

    if (!pageNumbers.includes(totalPages)) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const paginationRange = generatePagination();

  return (
    <PaginationContainer>
      <Page
        isDisabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        <FaChevronLeft />
      </Page>

      {paginationRange.map((page, index) => {
        if (page === "...") {
          return <p key={`prev-${index}`}>...</p>;
        } else {
          return (
            <Page
              key={page}
              isActive={page === currentPage}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </Page>
          );
        }
      })}

      <Page
        isDisabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        <FaChevronRight />
      </Page>
    </PaginationContainer>
  );
}

export default Pagination;
