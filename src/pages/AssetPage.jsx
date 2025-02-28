import { useDefineMonacoTheme } from "../hooks/useDefineMonacoTheme";
import styled from "styled-components";
import AssetInfo from "../components/assets/AssetInfo";
import CodeComponent from "../components/assets/CodeComponent";
import { useAsset } from "../components/assets/useAsset";
import GoBackButton from "../ui/GoBackButton";
import { ActiveFileProvider } from "../context/ActiveFileContext";
import PageSpinnerContainer from "../styles/PageSpinnerContainer";
import Buttons from "../styles/Buttons";
import Button from "../styles/Button";
import { useLocation, useNavigate } from "react-router-dom";

const AssetPageContainer = styled.div`
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function AssetPage() {
  useDefineMonacoTheme();
  const {asset, isPending} = useAsset()
  const navigate = useNavigate();
  const location = useLocation()

  if (isPending) return <PageSpinnerContainer />;
  return (
    <ActiveFileProvider>
      <AssetPageContainer>
        <CodeComponent />
        <AssetInfo />
        <GoBackButton />
      {asset.assetType === 0 &&  <Buttons>
          <Button variation="secondary" onClick={() => navigate(`${location.pathname}/edit`)}>
            EDIT
          </Button>
          <Button variation="secondary">DELETE</Button>
        </Buttons>}
      </AssetPageContainer>
    </ActiveFileProvider>
  );
}

export default AssetPage;
