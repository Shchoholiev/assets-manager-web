import { useDefineMonacoTheme } from "../hooks/useDefineMonacoTheme";
import styled from "styled-components";
import AssetInfo from "../components/assets/AssetInfo";
import CodeComponent from "../components/assets/CodeComponent";
import { useAsset } from "../components/assets/useAsset";
import { ActiveFileProvider } from "../context/ActiveFileContext";
import PageSpinnerContainer from "../styles/PageSpinnerContainer";

const AssetPageContainer = styled.div`
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function AssetPage() {
  useDefineMonacoTheme();
  const { isPending } = useAsset();

  //TODO PROJECT CREATION
  if (isPending) return <PageSpinnerContainer />;
  return (
    <ActiveFileProvider>
      <AssetPageContainer>
        <CodeComponent />
        <AssetInfo />
      </AssetPageContainer>
    </ActiveFileProvider>
  );
}

export default AssetPage;
