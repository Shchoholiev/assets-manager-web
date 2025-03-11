import { HiOutlineMenu, HiPlus } from "react-icons/hi";
import { PiCodeBold } from "react-icons/pi";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Modal from "./Modal";
import Button from "../styles/Button";
import { useUser } from "../components/authentication/useUser";

const StyledMenu = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5%;
  font-size: 16px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  &:hover {
    color: var(--yellow);
    transition: ease-in-out 300ms;
  }
  & svg {
    color: var(--teal);
  }

  &.active {
    color: var(--yellow);

    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 5px;
      height: 5px;
      background-color: var(--yellow);
      border-radius: 50%;
    }
  }
`;

const FilterButton = styled(Button)`
  justify-self: start;
  padding: 0%;
  padding-top: 0.8rem;
  & svg {
    width: 2;
  }
`;

const MobileMenuContainer = styled.div`
  background-color: var(--gray-500);
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding-top: 4rem;
`;

const MobileNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  position: relative;
  display: flex;
  align-items: center;
  height: 3.2rem;
  gap: 5px;
  padding-left: 1rem;
  &:hover {
    color: var(--yellow);
    transition: ease-in-out 300ms;
  }
  & svg {
    color: var(--teal);
  }

  &.active {
    color: var(--yellow);
    background-color: var(--gray-300);
  }
`;
function Menu() {
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const { user, isPending } = useUser();
  const userIsEnterprise = user.role.includes("Enterprise");
  if (isPending) return;
  if (isMobile) {
    return (
      <Modal>
        <Modal.Open opens="menu">
          <FilterButton variation="icon">
            <HiOutlineMenu />
          </FilterButton>
        </Modal.Open>

        <Modal.Window name="menu">
          <MobileMenuContainer>
            <MobileNavLink to="/assets" end>
              Browse
            </MobileNavLink>
            <MobileNavLink to="/my-assets">My Assets</MobileNavLink>
            <MobileNavLink to="/add-asset">
              Add Asset <HiPlus />
            </MobileNavLink>
            {userIsEnterprise && (
              <>
                <MobileNavLink to="/company-assets">
                  Company Assets
                </MobileNavLink>
                <MobileNavLink to="/project/start">
                  Start Project <PiCodeBold />
                </MobileNavLink>
              </>
            )}
          </MobileMenuContainer>
        </Modal.Window>
      </Modal>
    );
  }
  return (
    <StyledMenu>
      <StyledNavLink to="/assets" end>
        Browse
      </StyledNavLink>
      <StyledNavLink to="/my-assets">My Assets</StyledNavLink>
      <StyledNavLink to="/add-asset">
        Add Asset <HiPlus />
      </StyledNavLink>
      {userIsEnterprise && (
        <>
          <StyledNavLink to="/company-assets">Company Assets</StyledNavLink>
          <StyledNavLink to="/project/start">
            Start Project <PiCodeBold />
          </StyledNavLink>
        </>
      )}
    </StyledMenu>
  );
}

export default Menu;
