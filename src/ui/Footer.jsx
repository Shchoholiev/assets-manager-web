import { HiOutlineLogout } from "react-icons/hi";
import styled from "styled-components";
import Button from "../styles/Button";
import { useLogout } from "../components/authentication/useLogout";

const StyledFooter = styled.div`
  display: flex;
  justify-content: end;
  padding: 0 5vw;
  background-color: var(--gray-600);
  margin-top: 6rem;
  height: 3rem;
  width: 100vw;
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--black);
  &:hover {
    color: var(--red);
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 425px) {
    font-size: 12px;
    & svg {
      width: 14px;
    }
  }
`;
function Footer() {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };
  return (
    <StyledFooter>
      <StyledButton variation="icon" onClick={handleLogout}>
        <HiOutlineLogout />
        logout
      </StyledButton>
    </StyledFooter>
  );
}

export default Footer;
