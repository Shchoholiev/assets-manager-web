import styled from "styled-components";

const StyledTag = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isMain",
})`
  font-size: 16px;
  width: fit-content;
  padding: 0.4rem 1.2rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: var(--border-radius-s);
  text-align: center;
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
}) {
  return (
    <StyledTag isMain={isMain} backgroundColor={backgroundColor} color={color}>
      {name}
    </StyledTag>
  );
}

export default Tag;
