import styled from "styled-components";
import Asset from "../../ui/Asset";
import Tag from "../../ui/Tag";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";

const BrowseAssetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  background-color: var(--gray-600);
  border-radius: var(--border-radius-l);
  padding: 2rem;
  cursor: pointer;
  @media (max-width: 425px) {
    padding: 1.5rem;
  }
`;
const AssetInfo = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding-bottom: 1rem;
  @media (max-width: 425px) {
    gap: 0.5rem;
  }
`;
const UserName = styled.p`
  font-weight: bolder;
  font-size: 15px;
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
const AssetName = styled.h2`
  font-size: 20px;
  color: var(--white);
  text-decoration: underline;
  padding-bottom: 0.5rem;
  @media (max-width: 768px) {
    font-size: 17px;
  }
`;
function BrowseAsset({ asset }) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <BrowseAssetContainer
      onClick={() => navigate(`${location.pathname}/${asset.id}`)}
    >
      <AssetName>{asset.name}</AssetName>
      <AssetInfo>
        <UserName>by {asset.userName || "user"}</UserName>
        <Tag name={asset.language} isMain={true}/>
        {asset.tags.map((tag, index) => (
          <Tag name={tag.name} key={tag.id}/>
        ))}
      </AssetInfo>
      <Asset
        language={asset.language.toLowerCase()}
        text={asset.primaryCodeFile.text}
        height={isMobile ? "24vh" : "30vh"}
        readOnly="true"
      />
    </BrowseAssetContainer>
  );
}

export default BrowseAsset;
