import { useMediaQuery } from "react-responsive";
import Asset from "../../ui/Asset";
import { useAsset } from "./useAsset";
import styled from "styled-components";
import Folders from "../folders/Folders";
import { useActiveFile } from "../../context/ActiveFileContext";
import { useEditFile } from "./useEditFile";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import findParentFolder from "../../utils/findParentFolder";

const CodeComponentContainer = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  grid-gap: 3rem;
  align-items: end;
  @media (max-width: 1440px) {
    grid-template-columns: 0.4fr 1fr;
  }
  @media (max-width: 1024px) {
    grid-template-columns: 0.5fr 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 0;
  }
`;
const Code = styled.div`
  height: 48vh;
  background-color: var(--gray-600);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-l);
  @media (max-width: 768px) {
    align-items: start;
    padding: 1.7rem 0rem;
    height: max-content;
  }
`;

const FileName = styled.p`
  font-style: italic;
  margin: 0 0 0.7rem 0.7rem;
  color: var(--gray-100);
  @media (max-width: 768px) {
    text-align: end;
    margin: 0 0.7rem 0.7rem 0;
    font-size: 15px;
  }
`;

function CodeComponent({ readOnly = true }) {
  const { asset } = useAsset();
  const { activeFile } = useActiveFile();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const { editFile } = useEditFile();
  const [text, setText] = useState(activeFile?.text || "");
  const [debouncedText] = useDebounce(text, 1000);
  const prevText = useRef(debouncedText);
  
  useEffect(() => {
    setText(activeFile?.text || "");
  }, [activeFile]);

  useEffect(() => {
    if (!readOnly && activeFile && prevText.current !== debouncedText) {
      prevText.current = debouncedText;
      const parent = findParentFolder(asset.rootFolder, activeFile.id);

      editFile({
        id: activeFile.id,
        text: debouncedText,
        language: activeFile.language,
        name: activeFile.name,
        parentId: parent.id,
      });
    }
  }, [activeFile, asset.rootFolder, debouncedText, editFile, readOnly]);

  return (
    <CodeComponentContainer>
      <Folders rootFolder={asset.rootFolder} readOnly={readOnly} />
      <div>
        <FileName>{activeFile.name}</FileName>
        {asset && (
          <Code>
            <Asset
              language={activeFile.language.toLowerCase()}
              text={text}
              height={isMobile ? "24vh" : "44vh"}
              readOnly={readOnly}
              onChange={(newText) => setText(newText)}
            />
          </Code>
        )}
      </div>
    </CodeComponentContainer>
  );
}

export default CodeComponent;
