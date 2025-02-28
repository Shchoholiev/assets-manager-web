import { HiOutlineXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledTag = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isMain",
})`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 16px;
  width: fit-content;
  padding: 0.4rem 1.2rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: var(--border-radius-s);
  text-align: center;
  cursor: ${({ isRemovable }) => (isRemovable ? "pointer" : "default")};
  color: ${({ isMain, color }) => (isMain ? "var(--teal)" : color)};
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

function Tag({
  name,
  isMain = false,
  backgroundColor = "var(--gray-400)",
  color = "var(--yellow)",
  isRemovable = false,
  onClick,
  isPending = false,
}) {
  return (
    <StyledTag
      isMain={isMain}
      backgroundColor={backgroundColor}
      color={color}
      isRemovable={isRemovable}
      onClick={isPending ? undefined : onClick}
    >
      {name}
      {isRemovable && <HiOutlineXMark />}
    </StyledTag>
  );
}

export default Tag;
