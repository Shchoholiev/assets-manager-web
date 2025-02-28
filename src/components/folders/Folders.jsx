import { useMediaQuery } from "react-responsive";
import Modal from "../../ui/Modal";
import { OpenFoldersProvider } from "../../context/OpenFoldersContext";
import { HiOutlineFolderOpen } from "react-icons/hi";
import styled from "styled-components";
import Button from "../../styles/Button";
import FolderTree from "./FolderTree";
import { EditedFolderProvider } from "../../context/EditedFolderContext";
import { EditedFileProvider } from "../../context/EditedFileContext";
const FoldersContainer = styled.div`
  height: 52vh;
  background-color: var(--gray-600);
  border-radius: var(--border-radius-l);
  padding-top: 1rem;
  font-size: 17px;
  overflow: auto;
  line-height: 2rem;
  @media (max-width: 768px) {
    width: 100vw;
    height: 100vh;
    border-radius: 0%;
    padding-top: 4rem;
  }
`;
const Title = styled.p`
  color: var(--white);
  font-weight: bolder;
  margin-bottom: 0.8rem;
  letter-spacing: 0.5px;
  font-size: 18px;
  padding-left: 1.2rem;
`;
const FilterButton = styled(Button)`
  justify-self: start;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 16px;
  padding: 0%;
  cursor: pointer;
  color: var(--yellow);
`;

function Folders({ rootFolder, readOnly = true }) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  if (isMobile) {
    return (
      <EditedFolderProvider>
        <EditedFileProvider>
          <Modal>
            <Modal.Open opens="folders">
              <FilterButton variation="icon">
                <HiOutlineFolderOpen /> Files
              </FilterButton>
            </Modal.Open>
            <Modal.Window name="folders">
              <OpenFoldersProvider>
                <FoldersContainer>
                  <Title>Files</Title>
                  <FolderTree folder={rootFolder} readOnly={readOnly} />
                </FoldersContainer>
              </OpenFoldersProvider>
            </Modal.Window>
          </Modal>
        </EditedFileProvider>
      </EditedFolderProvider>
    );
  }
  return (
    <EditedFolderProvider>
      <EditedFileProvider>
        <OpenFoldersProvider>
          <FoldersContainer>
            <Title>Files</Title>
            <FolderTree folder={rootFolder} readOnly={readOnly} />
          </FoldersContainer>
        </OpenFoldersProvider>
      </EditedFileProvider>
    </EditedFolderProvider>
  );
}
export default Folders;
