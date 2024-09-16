import { once, showUI } from "@create-figma-plugin/utilities";

import { CloseHandler, InstructionsHandler } from "./types";
// globalThis.Request = Request;
import "@anthropic-ai/sdk/shims/web";
import { Anthropic } from "@anthropic-ai/sdk";

export default function () {
  once<InstructionsHandler>("INSTRUCTIONS", async function (instructions: string) {
    // const nodes: Array<SceneNode> = [];
    // for (let i = 0; i < 5; i++) {
    //   const rect = figma.createRectangle();
    //   rect.x = i * 150;
    //   rect.fills = [
    //     {
    //       color: { b: 0, g: 0.5, r: 1 },
    //       type: "SOLID",
    //     },
    //   ];
    //   figma.currentPage.appendChild(rect);
    //   nodes.push(rect);
    // }
    // figma.currentPage.selection = nodes;
    // figma.viewport.scrollAndZoomIntoView(nodes);
    // figma.closePlugin();
    console.log(instructions);
    console.log(figma.currentPage.selection);
    console.log(
      figma.currentPage.selection.map((node) => {
        return node.children;
      })
    );

    const anthropic = new Anthropic({
      // apiKey: process.env["ANTHROPIC_API_KEY"],
      apiKey: "sk-ant-api03-00000000",
    });

    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      messages: [{ role: "user", content: "Hello, Claude" }],
    });
    console.log(msg);

    // const simple_response = await fetch("https://httpbin.org/get?success=true");
    // const simple_json = await simple_response.json();

    // console.log(JSON.stringify(simple_json.args, null, 2));

    console.log("fetching...");
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": "sk-ant-api03-00000000",
        "anthropic-version": "2024-06-20",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1024,
        messages: [{ role: "user", content: "Hello, world" }],
      }),
      mode: "no-cors", // Add this line to disable CORS
    });

    console.log("got response");

    const data = await response.json();
    console.log(data);

    // const response = await fetch("https://httpbin.org/get?success=true");
    // const json = await response.json();

    // console.log(JSON.stringify(json.args, null, 2));
  });
  once<CloseHandler>("CLOSE", function () {
    figma.closePlugin();
  });
  showUI({
    height: 180,
    width: 240,
  });
}
