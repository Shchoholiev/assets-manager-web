import styled from "styled-components";
import Button from "../styles/Button";
import SearchInput from "./SearchInput";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/authentication/useUser";
import UserData from "./UserData";
import { useMediaQuery } from "react-responsive";

const StyledHeader = styled.div`
  margin-top: 1rem;
  display: flex;
  width: 100%;
  justify-self: center;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.8rem;
  }
`;

const MobileBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
function Header() {
  const { user, isPending } = useUser();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  if (isPending) return;
  if (isMobile)
    return (
      <StyledHeader>
        <MobileBox>
          <Logo />
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
        </MobileBox>

        <SearchInput />
      </StyledHeader>
    );
  return (
    <StyledHeader>
      <Logo />
      <SearchInput />
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
    </StyledHeader>
  );
}

export default Header;
