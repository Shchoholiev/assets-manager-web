import { HiOutlineXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledTag = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})`
  background-color: ${(props) =>
    props.isActive ? "var(--teal)" : "var(--gray-400)"};
  color: ${(props) => props.isActive && "var(--yellow)"};
  width: fit-content;
  padding: 0.6rem 0.9rem;
  border-radius: var(--border-radius-s);
  text-align: center;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
  &:hover {
    background-color: var(--teal);
    color: var(--yellow);
    transition: ease-in-out 300ms;
  }

  @media (max-width: 1440px) {
    font-size: 16px;
  }
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 0.5rem 1rem;
  }
`;

function FilterTag({ name, isPending = false, onClick, isActive = false }) {
  return (
    <StyledTag onClick={isPending ? undefined : onClick} isActive={isActive}>
      {name}
      {isActive && <HiOutlineXMark />}
    </StyledTag>
  );
}

export default FilterTag;
