import Input from "../../styles/Input";
import Button from "../../styles/Button";
import styled from "styled-components";
import * as Select from "@radix-ui/react-select";
import { TbBrandJavascript, TbBrandPython, TbHash } from "react-icons/tb";
import { HiChevronDown } from "react-icons/hi";
import { useState } from "react";
import { useCreateAsset } from "./useCreateAsset";
import Spinner from "../../ui/Spinner";
import { useUser } from "../authentication/useUser";
import toast from "react-hot-toast";
import { detectExtension } from "../../utils/detectLanguage";

const StyledForm = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  @media (max-width: 1024px) {
    width: 75vw;
  }
  @media (max-width: 425px) {
    width: 95vw;
  }
`;

const StyledInput = styled(Input)`
  background-color: var(--gray-500);
  color: var(--gray-100);
  font-size: 16px;
  margin-bottom: 1rem;
  &::placeholder {
    color: var(--gray-200);
  }
  &[disabled] {
    background-color: var(--gray-600);
    color: var(--gray-500) ;
    cursor: not-allowed;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
const P = styled.p`
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
const SelectTrigger = styled(Select.Trigger)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  background-color: var(--gray-500);
  border-radius: var(--border-radius-m);
  color: var(--gray-100);
  padding: 1.2rem;
  font-size: 16px;
  margin-bottom: 1.5rem;
  &::placeholder {
    color: var(--black);
  }
  &[disabled] {
    background-color: var(--gray-600);
    color: var(--gray-500) ;
    cursor: not-allowed;
  }
  @media (max-width: 1024px) {
    padding: 1rem;
    font-size: 16px;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const SelectContent = styled(Select.Content)`
  width: 50vw;
  margin-top: 0.1rem;
  background: var(--gray-500);
  color: var(--gray-100);
  border-radius: var(--border-radius-s);
  padding: 1rem;
  z-index: 100;
  @media (max-width: 1024px) {
    font-size: 15px;
  }
  @media (max-width: 1024px) {
    width: 75vw;
  }
  @media (max-width: 425px) {
    width: 95vw;
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

function AddAssetForm() {
  const [language, setLanguage] = useState("Javascript");
  const [name, setName] = useState("");
  const { createAsset, isPending } = useCreateAsset();
  const { user } = useUser();
  const handleCreate = () => {
    if (!name) {
      toast.error("Asset must have a title!");
      return;
    }
    createAsset({
      name,
      assetType: user.role.includes("Enterprise") ? 2 : 1,
      language,
      rootFolderName: name.replace(/\s+/g, "_"),
      primaryCodeFileName: "primary" + detectExtension(language),
    });
  };

  return (
    <StyledForm>
      <P>Title: </P>
      <StyledInput
        type="text"
        placeholder="Provide a name that describes your asset"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isPending}
      />
      <P>Language: </P>

      <Select.Root
        value={language}
        onValueChange={setLanguage}
        disabled={isPending}
      >
        <SelectTrigger>
          <Select.Value>{language} </Select.Value>
          <Select.Icon>
            <HiChevronDown />
          </Select.Icon>
        </SelectTrigger>

        <Select.Portal>
          <SelectContent position="popper" side="bottom" align="center">
            <Select.Viewport>
              <SelectItem value="Javascript">
                <TbBrandJavascript /> JavaScript
              </SelectItem>
              <SelectItem value="Python">
                <TbBrandPython /> Python
              </SelectItem>
              <SelectItem value="Csharp">
                <TbHash />
                CSharp
              </SelectItem>
            </Select.Viewport>
          </SelectContent>
        </Select.Portal>
      </Select.Root>

      <Button variation="primary" disabled={isPending} onClick={handleCreate}>
        {isPending ? <Spinner /> : "CREATE"}
      </Button>
    </StyledForm>
  );
}

export default AddAssetForm;
