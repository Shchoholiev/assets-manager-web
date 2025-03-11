import { useAsset } from "./useAsset";
import Tag from "../../ui/Tag";
import styled from "styled-components";
import GoBackButton from "../../ui/GoBackButton";
import { useUser } from "../authentication/useUser";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Buttons from "../../styles/Buttons";
import Button from "../../styles/Button";
import Modal from "../../ui/Modal";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { useDeleteAsset } from "./useDeleteAsset";
import Spinner from "../../ui/Spinner";
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
const Tags = styled.div`
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
`;
const Title = styled.h2`
  color: var(--white);
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
const Author = styled.p`
  font-weight: bolder;
`;

const ModalContainer = styled.div`
  width: 40vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 3rem 4rem 2rem 4rem;
  background-color: var(--gray-400);
  border-radius: var(--border-radius-l);
  text-align: center;
  & svg {
    color: var(--gray-600);
    align-self: center;
    width: 3.5rem;
    height: 3.5rem;
  }
  & span {
    font-weight: bold;
  }
  @media (max-width: 768px) {
    width: 75vw;
    & svg {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
  @media (max-width: 425px) {
    width: 95vw;
    font-size: 16px;
    padding: 3rem 2rem 2rem 2rem;
  }
`;
function AssetInfo() {
  const { asset } = useAsset();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { deleteAsset, isPending } = useDeleteAsset();

  const handleDelete = () => {
    deleteAsset({ id });
  };
  return (
    <InfoContainer>
      <Title>{asset.name}</Title>
      <Author>by {asset.userName || "user"}</Author>

      <Tag name={asset.language} backgroundColor="var(--gray-600)" />
      <Tags>
        {asset.tags.map((tag) => (
          <Tag name={tag.name} key={tag.id} color="var(--gray-100)" />
        ))}
      </Tags>
      <p>{asset.description}</p>
      <GoBackButton />
      {asset.createdById === user.id && (
        <Buttons>
          <Button
            variation="secondary"
            onClick={() => navigate(`${location.pathname}/edit`)}
          >
            EDIT
          </Button>
          <Modal>
            <Modal.Open opens="delete">
              <Button variation="secondary">DELETE</Button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ModalContainer>
                <HiOutlineExclamationTriangle />
                <p>
                  Are you sure you want to delete <br />
                  <span>{asset.name}</span>?
                </p>
                <Button variation="delete" onClick={handleDelete}>
                  {isPending ? <Spinner /> : "DELETE"}
                </Button>
              </ModalContainer>
            </Modal.Window>
          </Modal>
        </Buttons>
      )}
    </InfoContainer>
  );
}

export default AssetInfo;
