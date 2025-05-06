import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../styles/Button";
import { Select } from "radix-ui";
import { HiChevronDown, HiOutlineStar, HiStar } from "react-icons/hi";
import { useCompany } from "../components/companies/useCompany";
import { useUser } from "../components/authentication/useUser";
import { useRemoveCompanyMember } from "../components/companies/useRemoveCompanyMemper";
import toast from "react-hot-toast";
import { useChangeRole } from "../components/companies/useChangeRole";
import { useMediaQuery } from "react-responsive";

const Table = styled.table`
  width: 100%;
  white-space: nowrap;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: var(--border-radius-l);
  background-color: var(--gray-600);
  padding-bottom: 1.4rem;
  @media (max-width: 1024px) {
    font-size: 16px;
  }
`;

const Th = styled.th`
  text-align: left;
  font-weight: 500;
  color: var(--yellow);
  padding: 1rem;

  &:first-child {
    border-top-left-radius: var(--border-radius-l);
  }
  &:last-child {
    border-top-right-radius: var(--border-radius-l);
  }
`;
const Thead = styled.thead`
  background-color: var(--gray-500);
  cursor: text;
`;
const Tr = styled.tr`
  &:hover {
    background-color: var(--gray-500);
    color: var(--yellow);
    transition: ease-in-out 300ms;
  }
`;

const Td = styled.td`
  padding: 0.7rem 1rem;
  cursor: pointer;
`;

const SelectTrigger = styled(Select.Trigger)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  background-color: transparent;
  border-radius: var(--border-radius-m);
  color: var(--gray-100);
  padding: 1rem;
  &::placeholder {
    color: var(--black);
  }
  &:hover {
    color: var(--teal);
    transition: ease-in-out 300ms;
  }
  &[disabled] {
    background-color: var(--gray-600);
    color: var(--gray-500);
    cursor: not-allowed;
  }
  @media (max-width: 1024px) {
    padding: 1rem;
    font-size: 16px;
  }
  @media (max-width: 768px) {
    background-color: var(--gray-400);
    font-size: 14px;
    padding: 0.7rem;
  }
  @media (max-width: 425px) {
    font-size: 13px;
  }
`;

const SelectContent = styled(Select.Content)`
  width: 10vw;
  margin-top: 0.1rem;
  background: var(--gray-500);
  color: var(--gray-100);
  border-radius: var(--border-radius-s);
  padding: 1rem;
  z-index: 100;

  @media (max-width: 1024px) {
    font-size: 15px;
    width: 60vw;
  }
  @media (max-width: 768px) {
    width: 90vw;
  }
`;

const SelectItem = styled(Select.Item)`
  all: unset;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: var(--border-radius-s);
  gap: 0.4rem;
  &:hover {
    background: var(--gray-400);
    color: var(--white);
  }

  &[data-state="checked"] {
    color: var(--white);
    background: var(--gray-400);
  }

  & svg {
    color: var(--yellow);
  }
`;
const RemoveButton = styled(Button)`
  background-color: transparent;
  color: var(--gray-200);
  &:hover {
    color: var(--pink);
    transition: ease-in-out 300ms;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const NameCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  & svg {
    color: var(--dark-teal);
  }

  @media (max-width: 768px) {
    font-weight: bolder;
    color: var(--yellow);
  }
`;

const MobileBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 15px;
  @media (max-width: 425px) {
    font-size: 13px;
  }
`;

const MobileUserRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--gray-600);
  padding: 1rem;
  border-radius: var(--border-radius-m);
  gap: 0.7rem;
`;
export default function TeamTable() {
  const { company, isPending } = useCompany();
  const { user: currentUser } = useUser();
  const members = company.users;
  const [roles, setRoles] = useState({});
  const { changeMemberRole, isPending: isChanging } = useChangeRole();
  const { removeCompanyMember, isPending: isRemoving } =
    useRemoveCompanyMember();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    let toastId = null;

    if (isRemoving || isChanging) {
      toastId = toast.loading("Applying changes...");
    }

    return () => {
      if (toastId) {
        toast.dismiss(toastId);
      }
    };
  }, [isRemoving, isChanging]);

  const handleRoleChange = (userId, roleName) => {
    changeMemberRole(
      { userId, roleName },
      {
        onSuccess: () => {
          setRoles((prev) => ({ ...prev, [userId]: roleName }));
        },
      }
    );
  };

  const handleRemoveUser = (userId) => {
    removeCompanyMember({ userId });
  };
  if (isMobile)
    return (
      <MobileBox>
        {members.map((user) => {
          const lastRole = user.roles[user.roles.length - 1];
          const currentRole = roles[user.id] || lastRole.name;
          const isAdmin =
            currentUser.role[currentUser.role.length - 1] === "Admin";
          return (
            <MobileUserRow>
              <NameCell>
                {user.name}
                {currentRole === "Admin" && <HiStar />}
              </NameCell>
              <p> {user.email}</p>
              {isAdmin ? (
                <Select.Root
                  value={currentRole}
                  onValueChange={(value) => handleRoleChange(user.id, value)}
                  disabled={isPending}
                >
                  <SelectTrigger>
                    <Select.Value>
                      {currentRole !== "Enterprise" ? currentRole : "User"}
                    </Select.Value>
                    <Select.Icon>
                      <HiChevronDown />
                    </Select.Icon>
                  </SelectTrigger>

                  <Select.Portal>
                    <SelectContent
                      position="popper"
                      side="bottom"
                      align="center"
                    >
                      <Select.Viewport>
                        <SelectItem value="Admin">
                          <HiStar /> Admin
                        </SelectItem>

                        <SelectItem value="Enterprise">
                          <HiOutlineStar /> User
                        </SelectItem>
                      </Select.Viewport>
                    </SelectContent>
                  </Select.Portal>
                </Select.Root>
              ) : (
                <p>{currentRole !== "Enterprise" ? currentRole : "User"}</p>
              )}
              {user.id !== currentUser.id && isAdmin && (
                <Button
                  disabled={isRemoving}
                  onClick={() => handleRemoveUser(user.id)}
                  variation="delete"
                >
                  Remove
                </Button>
              )}
            </MobileUserRow>
          );
        })}
      </MobileBox>
    );
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Role</Th>
          {currentUser.role[currentUser.role.length - 1] === "Admin" && (
            <>
              <Th>Remove from company</Th>
            </>
          )}
        </Tr>
      </Thead>
      <tbody>
        {members.map((user) => {
          const lastRole = user.roles[user.roles.length - 1];
          const currentRole = roles[user.id] || lastRole.name;
          const isAdmin =
            currentUser.role[currentUser.role.length - 1] === "Admin";
          return (
            <Tr key={user.id}>
              <Td>
                <NameCell>
                  {user.name}
                  {currentRole === "Admin" && <HiStar />}
                </NameCell>
              </Td>
              <Td>{user.email}</Td>
              {isAdmin ? (
                <>
                  <Td>
                    <Select.Root
                      value={currentRole}
                      onValueChange={(value) =>
                        handleRoleChange(user.id, value)
                      }
                      disabled={isPending}
                    >
                      <SelectTrigger>
                        <Select.Value>
                          {currentRole !== "Enterprise" ? currentRole : "User"}
                        </Select.Value>
                        <Select.Icon>
                          <HiChevronDown />
                        </Select.Icon>
                      </SelectTrigger>

                      <Select.Portal>
                        <SelectContent
                          position="popper"
                          side="bottom"
                          align="center"
                        >
                          <Select.Viewport>
                            <SelectItem value="Admin">
                              <HiStar /> Admin
                            </SelectItem>

                            <SelectItem value="Enterprise">
                              <HiOutlineStar /> User
                            </SelectItem>
                          </Select.Viewport>
                        </SelectContent>
                      </Select.Portal>
                    </Select.Root>
                  </Td>
                  <Td>
                    {user.id !== currentUser.id && (
                      <RemoveButton
                        disabled={isRemoving}
                        onClick={() => handleRemoveUser(user.id)}
                      >
                        Remove
                      </RemoveButton>
                    )}
                  </Td>
                </>
              ) : (
                <Td>{currentRole !== "Enterprise" ? currentRole : "User"}</Td>
              )}
            </Tr>
          );
        })}
      </tbody>
    </Table>
  );
}
