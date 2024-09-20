import styled from "styled-components";
import Button from "../styles/Button";
import SearchInput from "../styles/SearchInput";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/authentication/useUser";
import UserData from "./UserData";

const StyledHeader = styled.div`
  margin-top: 1%;
  display: flex;
  width: 100vw;
  justify-self: center;
  justify-content: space-evenly;
  align-items: center;
`;
function Header() {
  const {user, isPending} = useUser()
  const navigate = useNavigate();
  if(isPending) return;
  return (
    <StyledHeader>
      <Logo />
      <SearchInput />
     { user ? <UserData /> : <Button
        variation="primary"
        width="10%"
        onClick={() => navigate("/login")}
      >
        Log In
      </Button>}
    </StyledHeader>
  );
}

export default Header;
