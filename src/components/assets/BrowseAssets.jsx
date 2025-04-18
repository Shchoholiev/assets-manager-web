import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import BrowseAsset from "./BrowseAsset";
import { useAssets } from "./useAssets";
import { useDefineMonacoTheme } from "../../hooks/useDefineMonacoTheme";
import Pagination from "../../ui/Pagination";
import { useLocation } from "react-router-dom";
import PageTitle from "../../ui/PageTitle";
import { HiOutlineCube, HiOutlineRocketLaunch } from "react-icons/hi2";
import { useCompany } from "../companies/useCompany";

const BrowseAssetsContainer = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 2rem;
  height: fit-content;
`;
const SpinnerContainer = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  padding-top: 20%;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: fit-content;
  @media (max-width: 768px) {
    align-items: center;
  }
`;
const CompanyName = styled.div`
  background-color: var(--yellow);
  width: fit-content;
  padding: 0.5rem 1.5rem;
  color: var(--teal);
  font-weight: bold;
  border-radius: var(--border-radius-s);
  @media (max-width: 768px) {
    font-size: 16px;
  }
  @media (max-width: 425px) {
    font-size: 14px;
  }
`;
function BrowseAssets() {
  useDefineMonacoTheme();
  const { assets, isPending } = useAssets();
  const { company } = useCompany();
  const location = useLocation();

  if (isPending)
    return (
      <SpinnerContainer>
        <Spinner size="60" />
      </SpinnerContainer>
    );
  if (!assets.items.length) return <p>No assets found</p>;

  return (
    <BrowseAssetsContainer>
      {location.pathname === "/company-assets" && (
        <TitleContainer>
          <PageTitle leftAlign={true}>
            {" "}
            <HiOutlineCube />
            BROWSE COMPANY ASSETS
          </PageTitle>
          {company && <CompanyName>{company.name.toUpperCase()}</CompanyName>}
        </TitleContainer>
      )}
      {location.pathname === "/my-assets" && (
        <TitleContainer>
          <PageTitle leftAlign={true}>
            {" "}
            <HiOutlineRocketLaunch />
            BROWSE YOUR ASSETS
          </PageTitle>
        </TitleContainer>
      )}
      {assets.items.map((asset) => (
        <BrowseAsset asset={asset} key={asset.id} />
      ))}
      <Pagination />
    </BrowseAssetsContainer>
  );
}

export default BrowseAssets;
