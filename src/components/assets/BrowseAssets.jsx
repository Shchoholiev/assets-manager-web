import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import BrowseAsset from "./BrowseAsset";
import { useAssets } from "./useAssets";
import { useDefineMonacoTheme } from "../../hooks/useDefineMonacoTheme";
import Pagination from "../../ui/Pagination";

const BrowseAssetsContainer = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 2rem;
`;
const SpinnerContainer = styled.div`
  height: 80vh ;
  display: flex;
  justify-content: center;
  padding-top: 20%;
`;
function BrowseAssets() {
  useDefineMonacoTheme();
  const { assets, isPending } = useAssets();
  if (isPending)
    return (
      <SpinnerContainer>
        <Spinner size="60" />
      </SpinnerContainer>
    );
  if (!assets.items.length) return <p>No assets found</p>;
  return (
    <BrowseAssetsContainer>
      {assets.items.map((asset) => (
        <BrowseAsset asset={asset} key={asset.id} />
      ))}
      <Pagination />
    </BrowseAssetsContainer>
  );
}

export default BrowseAssets;
