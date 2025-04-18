import styled from "styled-components";
import { useTags } from "./useTags";
import Spinner from "../../ui/Spinner";
import FilterTag from "../../ui/FilterTag";
import { useSearchParams } from "react-router-dom";
import Modal from "../../ui/Modal";
import Button from "../../styles/Button";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { useMediaQuery } from "react-responsive";

const AssetsSidebarContainer = styled.div`
  height: 100%;
  min-height: 80vh;
  background-color: var(--gray-600);
  border-radius: var(--border-radius-l);
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  align-content: start;
  @media (max-width: 768px) {
    padding-top: 3rem;
    box-shadow: 0px 0px 20px 3px var(--teal-shadow);
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 1rem;
  margin-bottom: 1.2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled(Button)`
  justify-self: end;
  padding: 0%;
  padding-right: 0.8rem;
  & svg {
    width: 2;
  }
`;
const SpinnerContainer = styled(AssetsSidebarContainer)`
  justify-content: center;
  @media (max-width: 768px) {
    box-shadow: none;
    background-color: transparent;
  }
`;
function AssetsSidebar() {
  const { isPending, tags } = useTags();
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleTagClick = (tagId) => {
    const currentTagIds = searchParams.getAll("tagIds");

    if (currentTagIds.includes(tagId)) {
      const updatedTagIds = currentTagIds.filter((id) => id !== tagId);
      searchParams.delete("tagIds");
      searchParams.set("page", "1");
      updatedTagIds.forEach((id) => searchParams.append("tagIds", id)); // Re-add remaining tagIds
    } else {
      searchParams.append("tagIds", tagId);
      searchParams.set("page", "1");
    }

    setSearchParams(searchParams);
  };

  if (isPending)
    return (
      <SpinnerContainer>
        <Spinner color="--gray-200" />
      </SpinnerContainer>
    );
  if (isMobile)
    return (
      <Modal>
        <FilterContainer>
          {tags.items.map((tag) => {
            const isActive = searchParams.getAll("tagIds").includes(tag.id);
            if (isActive) {
              return (
                <FilterTag
                  onClick={() => handleTagClick(tag.id)}
                  name={tag.name}
                  isPending={isPending}
                  key={tag.id}
                  isActive={isActive}
                />
              );
            }
          })}
          <Modal.Open opens="filter">
            <FilterButton variation="icon">
              <HiOutlineAdjustmentsHorizontal />
            </FilterButton>
          </Modal.Open>
        </FilterContainer>
        <Modal.Window name="filter">
          <AssetsSidebarContainer>
            {tags.items.map((tag) => {
              const isActive = searchParams.getAll("tagIds").includes(tag.id);
              return (
                <FilterTag
                  onClick={() => handleTagClick(tag.id)}
                  name={tag.name}
                  isPending={isPending}
                  key={tag.id}
                  isActive={isActive}
                />
              );
            })}
          </AssetsSidebarContainer>
        </Modal.Window>
      </Modal>
    );

  return (
    <AssetsSidebarContainer>
      {tags.items.map((tag) => {
        const isActive = searchParams.getAll("tagIds").includes(tag.id); // Check if the tag is active
        return (
          <FilterTag
            onClick={() => handleTagClick(tag.id)}
            name={tag.name}
            isPending={isPending}
            key={tag.id}
            isActive={isActive}
          />
        );
      })}
    </AssetsSidebarContainer>
  );
}

export default AssetsSidebar;
