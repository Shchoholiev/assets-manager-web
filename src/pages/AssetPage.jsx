import { useDefineMonacoTheme } from "../hooks/useDefineMonacoTheme";
import Spinner from "../ui/Spinner";
import styled from "styled-components";
import AssetInfo from "../components/assets/AssetInfo";
import CodeComponent from "../components/assets/CodeComponent";
import { useAsset } from "../components/assets/useAsset";
import GoBackButton from "../ui/GoBackButton";
import { ActiveFileProvider } from "../context/ActiveFileContext";

const AssetPageContainer = styled.div`
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const SpinnerContainer = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  padding-top: 20%;
`;
function AssetPage() {
  useDefineMonacoTheme();
  const { isPending } = useAsset();

  if (isPending)
    return (
      <SpinnerContainer>
        <Spinner size="60" />
      </SpinnerContainer>
    );
  return (
    <ActiveFileProvider>
      <AssetPageContainer>
        <CodeComponent />
        <AssetInfo />
        <GoBackButton />
      </AssetPageContainer>
    </ActiveFileProvider>
  );
}

export default AssetPage;
