import styled from "styled-components";
import Button from "../../styles/Button";
import Buttons from "../../styles/Buttons";
import { useStarterProjects } from "./useStarterProjects";
import Asset from "../../ui/Asset";
import { useMediaQuery } from "react-responsive";

function Compiler() {
  const { starterProjects } = useStarterProjects();
  const asset = starterProjects?.codeAssets?.[0];
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div>
      <div>Files</div>
      <div>
        {asset && <Asset
          language={asset.language.toLowerCase()}
          text={asset.primaryCodeFile.text}
          height={isMobile ? "24vh" : "30vh"}
          readOnly="true"
        />}
      </div>
      <Button variation="primary">COMPILE</Button>
      <textarea placeholder="some errors" />
      <Buttons>
        <Button variation="primary">
          {/* {isPending ? <Spinner /> : "COMBINE ASSETS"} */}
          DOWNLOAD ZIP
        </Button>
        <Button variation="secondary">CHANGE PROMPT</Button>
      </Buttons>
    </div>
  );
}

export default Compiler;
