import styled from "styled-components";
import AssetsSidebar from "../components/assets/AssetsSidebar";
import BrowseAssets from "../components/assets/BrowseAssets";
import { useUser } from "../components/authentication/useUser";
import PageSpinnerContainer from "../styles/PageSpinnerContainer";

const AssetsContainer = styled.div`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: 0.25fr 1fr;
  grid-gap: 3rem;
  @media (max-width: 1440px) {
    grid-template-columns: 0.3fr 1fr;
  }
  @media (max-width: 1024px) {
    grid-template-columns: 0.4fr 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 0;
    margin-top: 1rem;
  }
`;
function Assets() {

  return (
    <AssetsContainer>
      <AssetsSidebar />
      <BrowseAssets />
    </AssetsContainer>
  );
}

export default Assets;
