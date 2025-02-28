import styled from "styled-components";
import Button from "../../styles/Button";
import Buttons from "../../styles/Buttons";
import { useAsset } from "./useAsset";
import { useState } from "react";
import Tag from "../../ui/Tag";
import { useNavigate } from "react-router-dom";
import { useEditAsset } from "./useEditAsset";
import Spinner from "../../ui/Spinner";
import { HiPlus } from "react-icons/hi";
import Modal from "../../ui/Modal";
import { useTags } from "./useTags";
import FilterTag from "../../ui/FilterTag";
import SearchTags from "../../ui/SearchTags";

const EditAssetInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 1024px) {
    font-size: 16px;
  }
  @media (max-width: 425px) {
    font-size: 14px;
  }
`;
const Component = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
const InlineComponent = styled.div`
  display: flex;
  gap: 1.5rem;
`;
const Title = styled.input`
  background-color: var(--gray-500);
  border: none;
  border-radius: var(--border-radius-s);
  padding-left: 0.6rem;
  color: var(--gray-100);
  min-width: 30%;
  @media (max-width: 1024px) {
    min-width: 60%;
  }
  
`;
const Description = styled.textarea`
  background-color: var(--gray-500);
  border: none;
  border-radius: var(--border-radius-s);
  padding: 0.6rem;
  color: var(--gray-100);
  resize: none;
  min-height: 7rem;
  margin-bottom: 3rem;
  @media (max-width:768px) {
    min-height: 10rem;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;
const AddTag = styled(Button)`
  background-color: var(--gray-300);
  color: var(--gray-100);
  &:hover {
    background-color: var(--gray-400);
  }
`;
const WindowContainer = styled.div`
  width: 40vw;
  display: grid;
  grid-column: 1fr;
  grid-gap: 1rem;
  background-color: var(--gray-600);
  border-radius: var(--border-radius-l);
  box-shadow: 0px 0px 20px 3px var(--black);
  padding: 2rem;
  padding-top: 4rem;

  @media (max-width: 1440px) {
    width: 60vw;
  }
  @media (max-width: 425px) {
    width: 95vw;
    padding: 1rem;
    padding-top: 3.2rem;
  }
`;
const WindowTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  align-content: start;
`;
function EditAssetInfo() {
  const { asset } = useAsset();
  const { tags, isPending: isGettingTags } = useTags();
  const [assetTags, setAssetTags] = useState(asset.tags);
  const { editAsset, isPending } = useEditAsset();
  const navigate = useNavigate();
  const [name, setName] = useState(asset.name);
  const [description, setDescription] = useState(asset.description);

  const handleEdit = () => {
    editAsset({
      id: asset.id,
      description,
      name,
      tagsIds: assetTags?.map((tag) => tag.id),
      assetType: asset.assetType,
      language: asset.language,
      rootFolderId: asset.rootFolder.id,
      primaryCodeFileId: asset.primaryCodeFile.id, 
    });
  };

  const handleTagClick = (tag) => {
    setAssetTags((prevTags) => {
      const tagExists = prevTags.some((t) => t.id === tag.id);

      if (tagExists) {
        return prevTags.filter((t) => t.id !== tag.id);
      } else {
        return [...prevTags, tag];
      }
    });
  };
  return (
    <EditAssetInfoContainer>
      <Component>
        <label>Title:</label>
        <InlineComponent>
          <Title value={name} onChange={(e) => setName(e.target.value)} />
          <Tag name={asset.language} isMain={true} />
        </InlineComponent>
      </Component>
      <Component>
        <label>Tags:</label>
        <Tags>
          {assetTags?.map((tag) => {
            return (
              <Tag
                key={tag.id}
                name={tag.name}
                isRemovable={true}
                onClick={() => handleTagClick(tag)}
              />
            );
          })}
          <Modal>
            <Modal.Open opens="tags">
              <AddTag>
                <HiPlus />
              </AddTag>
            </Modal.Open>
            <Modal.Window name="tags">
              <WindowContainer>
                <SearchTags />
                <WindowTags>
                  {isGettingTags && <Spinner />}
                  {tags?.items.length === 0 && "No tags found"}
                  {tags?.items.map((tag) => {
                    const isActive = assetTags?.some(
                      (assetTag) => assetTag.id === tag.id
                    );
                    return (
                      <FilterTag
                        onClick={() => handleTagClick(tag)}
                        name={tag.name}
                        key={tag.id}
                        isPending={isGettingTags}
                        isActive={isActive}
                      />
                    );
                  })}
                </WindowTags>
              </WindowContainer>
            </Modal.Window>
          </Modal>
        </Tags>
      </Component>
      <Component>
        <label>Description:</label>
        <Description
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Component>
      <Buttons>
        <Button variation="primary" onClick={handleEdit}>
          {" "}
          {isPending ? <Spinner /> : "DONE"}
        </Button>
        <Button variation="secondary" onClick={() => navigate(-1)}>
          DISCARD
        </Button>
      </Buttons>
    </EditAssetInfoContainer>
  );
}

export default EditAssetInfo;
