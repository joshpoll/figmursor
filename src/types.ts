import { EventHandler } from "@create-figma-plugin/utilities";

export interface InstructionsHandler extends EventHandler {
  name: "INSTRUCTIONS";
  handler: (instructions: string) => void;
}

export interface CreateRectanglesHandler extends EventHandler {
  name: "CREATE_RECTANGLES";
  handler: (count: number) => void;
}

export interface CloseHandler extends EventHandler {
  name: "CLOSE";
  handler: () => void;
}
