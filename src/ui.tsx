import {
  Button,
  Columns,
  Container,
  Muted,
  render,
  Text,
  TextboxMultiline,
  TextboxNumeric,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";

import { CloseHandler, InstructionsHandler } from "./types";

function Plugin() {
  const [instructions, setInstructions] = useState<string>("");
  const handleCreateRectanglesButtonClick = useCallback(
    function () {
      if (instructions !== "") {
        emit<InstructionsHandler>("INSTRUCTIONS", instructions);
      }
    },
    [instructions]
  );
  const handleCloseButtonClick = useCallback(function () {
    emit<CloseHandler>("CLOSE");
  }, []);
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        handleCreateRectanglesButtonClick();
      }
    },
    [handleCreateRectanglesButtonClick]
  );

  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text>
        <Muted>Instructions</Muted>
      </Text>
      <VerticalSpace space="small" />
      <TextboxMultiline
        onValueInput={setInstructions}
        value={instructions}
        variant="border"
        onKeyDown={handleKeyDown}
      />
      <VerticalSpace space="extraLarge" />
      <Columns space="extraSmall">
        <Button fullWidth onClick={handleCreateRectanglesButtonClick}>
          Submit
        </Button>
        <Button fullWidth onClick={handleCloseButtonClick} secondary>
          Close
        </Button>
      </Columns>
      <VerticalSpace space="small" />
    </Container>
  );
}

export default render(Plugin);
