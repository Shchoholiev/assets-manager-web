import styled from "styled-components";
import PageTitle from "../ui/PageTitle";
import { TbLibraryPlus } from "react-icons/tb";
import AddAssetForm from "../components/assets/AddAssetForm";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

function AddAssetPage() {
  return (
    <Container>
      <PageTitle>
        <TbLibraryPlus />
      <p>CREATE ASSET</p>
      </PageTitle>
      <AddAssetForm />
    </Container>
  );
}

export default AddAssetPage;
