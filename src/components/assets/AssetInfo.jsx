import { useAsset } from "./useAsset";
import Tag from "../../ui/Tag";
import styled from "styled-components";
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
const Tags = styled.div`
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
`;
const Title = styled.h2`
  color: var(--white);
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
const Author = styled.p`
  font-weight: bolder;
`;
function AssetInfo() {
  const { asset } = useAsset();

  return (
    <InfoContainer>
      <Title>{asset.name}</Title>
      <Author>by {asset.user || "user"}</Author>

      <Tag name={asset.tags[0].name} backgroundColor="var(--gray-600)" />
      <Tags>
        {asset.tags.map(
          (tag, index) =>
            index !== 0 && (
              <Tag name={tag.name} key={tag.id} color="var(--gray-100)" />
            )
        )}
      </Tags>
      <p>{asset.description}</p>
    </InfoContainer>
  );
}

export default AssetInfo;
