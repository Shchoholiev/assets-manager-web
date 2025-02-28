import { HiOutlinePencil } from "react-icons/hi";
import { ActiveFileProvider } from "../context/ActiveFileContext";
import PageTitle from "../ui/PageTitle";
import styled from "styled-components";
import CodeComponent from "../components/assets/CodeComponent";
import { useAsset } from "../components/assets/useAsset";
import PageSpinnerContainer from "../styles/PageSpinnerContainer";
import { useDefineMonacoTheme } from "../hooks/useDefineMonacoTheme";
import EditAssetInfo from "../components/assets/EditAssetInfo";
import { useTags } from "../components/assets/useTags";
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
function EditPage() {
  useDefineMonacoTheme();
  const { isPending } = useAsset();
  if (isPending) return <PageSpinnerContainer />;
  return (
    <ActiveFileProvider>
        <Container>
          <PageTitle>
            <HiOutlinePencil />
            <p>EDIT ASSET</p>
          </PageTitle>
          <CodeComponent readOnly={false} />
          <EditAssetInfo />
        </Container>
    </ActiveFileProvider>
  );
}

export default EditPage;
