import {
  HiChevronDown,
  HiChevronRight,
  HiOutlineFolderOpen,
} from "react-icons/hi";
import styled from "styled-components";
import {
  OpenFoldersProvider,
  useOpenFolders,
} from "../../context/OpenFoldersContext.jsx";
import { useActiveFile } from "../../context/ActiveFileContext.jsx";
import { useMediaQuery } from "react-responsive";
import Modal from "../../ui/Modal.jsx";
import Button from "../../styles/Button.jsx";

const FoldersContainer = styled.div`
  height: 52vh;
  background-color: var(--gray-600);
  border-radius: var(--border-radius-l);
  padding-top: 1rem;
  line-height: 2rem;
  font-size: 17px;
  overflow: scroll;

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

const FolderTreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
`;
const OpenedFolderContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.7rem;
  border-left: 1px solid var(--gray-500);
`;
const Folder = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 3px 0px;

  padding-left: 1rem;
  & svg {
    color: var(--yellow);
  }
  &:hover {
    background-color: var(--gray-400);
  }
`;

const File = styled.div`
  padding: 3px 0px;
  padding-left: 1rem;
  background-color: ${({ isActive }) =>
    isActive ? "var(--gray-500)" : "transparent"};
  cursor: pointer;
  &:hover {
    background-color: var(--gray-500);
  }
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
function FolderTree({ folder }) {
  const { openFolders, toggleFolder } = useOpenFolders();
  const { activeFile, setActiveFile } = useActiveFile();

  const isOpen = openFolders[folder.id] || false;

  return (
    <FolderTreeContainer>
      <Folder onClick={() => toggleFolder(folder.id)}>
        {isOpen ? <HiChevronDown /> : <HiChevronRight />} {folder.name}
      </Folder>

      {isOpen && (
        <OpenedFolderContent>
          {folder.items.map((item) =>
            item.type === 0 ? (
              <FolderTree key={item.id} folder={item} />
            ) : (
              <File
                key={item.id}
                onClick={() => setActiveFile(item)}
                isActive={activeFile?.name === item.name}
              >
                {item.name}
              </File>
            )
          )}
        </OpenedFolderContent>
      )}
    </FolderTreeContainer>
  );
}

function Folders({ rootFolder }) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  if (isMobile) {
    return (
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
              <FolderTree folder={rootFolder} />
            </FoldersContainer>
          </OpenFoldersProvider>
        </Modal.Window>
      </Modal>
    );
  }
  return (
    <OpenFoldersProvider>
      <FoldersContainer>
        <Title>Files</Title>
        <FolderTree folder={rootFolder} />
      </FoldersContainer>
    </OpenFoldersProvider>
  );
}
export default Folders;
