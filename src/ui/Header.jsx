import styled from "styled-components";
import Button from "../styles/Button";
import SearchInput from "../styles/SearchInput";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/authentication/useUser";
import UserData from "./UserData";
import { useMediaQuery } from "react-responsive";

const StyledHeader = styled.div`
  margin-top: 1rem;
  display: flex;
  width: 100vw;
  justify-self: center;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 768px) {
    width: 90vw;
    gap: 1.8rem;
    flex-wrap: wrap;
    justify-content: space-between;

    & > *:nth-child(3) {
      flex-basis: 100%;
    }
  }

  @media (max-width: 425px) {
    width: 95vw;
  }
  
`;
function Header() {
  const { user, isPending } = useUser();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  if (isPending) return;
  return (
    <StyledHeader>
      <Logo />
      {!isMobile && <SearchInput />}
      {user ? (
        <UserData />
      ) : (
        <Button
          variation="primary"
          width={!isMobile ? "10%" : "25%"}
          onClick={() => navigate("/login")}
        >
          Log In
        </Button>
      )}

      {isMobile && <SearchInput />}
    </StyledHeader>
  );
}

export default Header;
