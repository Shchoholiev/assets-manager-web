import styled from "styled-components";
import Button from "../../styles/Button";
import { useEffect, useState } from "react";
import { useAskAI } from "./useAskAI";
import Spinner from "../../ui/Spinner";
import { usePrompt } from "./usePrompt";
import { useQueryClient } from "@tanstack/react-query";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 70vw;
  justify-self: center;
`;
const Text = styled.textarea`
  height: 7rem;
  border: none;
  background-color: var(--gray-400);
  border-radius: var(--border-radius-s);
  padding: 0.6rem 1rem;
  font-size: 15px;
  width: 100%;
  resize: none;
  &::placeholder {
    color: var(--gray-200);
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
`;
function Prompt() {
  const queryClient = useQueryClient();
  const { prompt } = usePrompt();
  const { askAI, isPending } = useAskAI();
  const [promptText, setPromptText] = useState(prompt || "");


  useEffect(() => {
    setPromptText(prompt || "");
  }, [prompt]);

  const handlePromptChange = (e) => {
    setPromptText(e.target.value);
  };

  const handleAskAI = () => {
    queryClient.setQueryData(["starter-prompt"], promptText);
    askAI({ prompt: promptText });
  };

  return (
    <Container>
      <Text
        placeholder="Describe a project you want to create... "
        value={promptText}
        onChange={handlePromptChange}
      />
      <Button variation="primary" width="100%" onClick={handleAskAI}>
        {isPending ? <Spinner /> : "ASK AI"}
      </Button>
    </Container>
  );
}

export default Prompt;
