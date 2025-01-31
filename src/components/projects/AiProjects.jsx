import styled from "styled-components";
import BrowseAsset from "../assets/BrowseAsset";
import { useStarterProjects } from "./useStarterProjects";
import Button from "../../styles/Button";
import { useQueryClient } from "@tanstack/react-query";
import { useCombine } from "./useCombine";
import Spinner from "../../ui/Spinner";
import Buttons from "../../styles/Buttons";
const AiProjectsContainer = styled.div`
  width: 70vw;
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 2rem;
`;

function AiProjects() {
  const { starterProjects } = useStarterProjects();
  const queryClient = useQueryClient();
  const { combine, isPending } = useCombine();

  const handleDiscard = () => {
    queryClient.setQueryData(["starter-prompt"], "");
    queryClient.setQueryData(["starter-projects"], []);
  };
  const handleCombine = () => {
    if (starterProjects?.id) {
      combine({ id: starterProjects.id });
    }
  };
  if (!starterProjects || starterProjects.length === 0) return null;
  return (
    <AiProjectsContainer>
      {starterProjects.codeAssets.map((asset) => (
        <BrowseAsset asset={asset} key={asset.id} />
      ))}
      <Buttons>
        <Button variation="primary" onClick={handleCombine}>
          {isPending ? <Spinner /> : "COMBINE ASSETS"}
        </Button>
        <Button variation="secondary" onClick={handleDiscard}>
          DISCARD
        </Button>
      </Buttons>
    </AiProjectsContainer>
  );
}

export default AiProjects;
