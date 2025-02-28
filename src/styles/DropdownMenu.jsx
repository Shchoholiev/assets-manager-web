import { DropdownMenu } from "radix-ui";
import styled from "styled-components";

export const Operations = styled.div`
  display: flex;
  gap: 0.7rem;
  margin-left: auto;
  padding: 0 0.7rem;
  color: var(--white);
  opacity: ${({ isActive }) => (isActive ? "1" : "0")};
  visibility: ${({ isActive }) => (isActive ? "visible" : "hidden")};

  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;

  & svg:hover {
    color: var(--yellow);
    transition: color 0.2s ease-in-out;
  }
`;

export const StyledContent = styled(DropdownMenu.Content)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: none;
  padding: 0.7rem;
  background-color: var(--gray-500);
  margin-top: 0.5rem;
  border-radius: var(--border-radius-s);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  font-size: 15px;
`;

export const StyledItem = styled(DropdownMenu.Item)`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.2rem 0.5rem;
  border-radius: var(--border-radius-s);
  &:hover {
    background-color: var(--gray-300);
    outline: none;
    transition: color 0.2s ease-in-out;
  }
  &:hover svg {
    color: var(--yellow);
    transition: color 0.2s ease-in-out;
  }
`;

export const StyledToggle = styled(DropdownMenu.Trigger)`
  background: transparent;
  border: none;
  &:focus {
    outline: none;
  }
`;
