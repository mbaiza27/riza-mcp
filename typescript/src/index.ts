#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  CallToolResult,
} from "@modelcontextprotocol/sdk/types.js";
import Riza from "@riza-io/api";
import {
  CREATE_TOOL_TOOL,
  EDIT_TOOL_TOOL,
  EXECUTE_CODE_TOOL,
  EXECUTE_TOOL,
  FETCH_TOOL_TOOL,
  LIST_TOOLS_TOOL,
} from "./toolDefinitions.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const printMessage = (...messages: unknown[]) => {
  // Using error to avoid interfering with MCP communication that happens on stdout
  console.error(...messages);
  console.error("--------------------------------");
};

const riza = new Riza({
  apiKey: process.env.RIZA_API_KEY,
});

const TOOLS = {
  [CREATE_TOOL_TOOL.name]: CREATE_TOOL_TOOL,
  [FETCH_TOOL_TOOL.name]: FETCH_TOOL_TOOL,
  [EDIT_TOOL_TOOL.name]: EDIT_TOOL_TOOL,
  [EXECUTE_CODE_TOOL.name]: EXECUTE_CODE_TOOL,
  [LIST_TOOLS_TOOL.name]: LIST_TOOLS_TOOL,
  [EXECUTE_TOOL.name]: EXECUTE_TOOL,
} as const;

// Create server instance
const server = new Server(
  {
    name: "riza",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: { listChanged: true },
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: Object.values(TOOLS),
  };
});

// Handle tool execution
server.setRequestHandler(
  CallToolRequestSchema,
  async (request): Promise<CallToolResult> => {
    const { name, arguments: args } = request.params;

    const getExecutionResult = async () => {
      if (name === CREATE_TOOL_TOOL.name) {
        const input = args as {
          name: string;
          description: string;
          code: string;
          input_schema: Record<string, unknown>;
          language: "TYPESCRIPT" | "PYTHON";
        };
        const result = await riza.tools.create(input);
        return result;
      } else if (name === FETCH_TOOL_TOOL.name) {
        const input = args as { tool_id: string };
        const result = await riza.tools.get(input.tool_id);
        return result;
      } else if (name === EDIT_TOOL_TOOL.name) {
        const input = args as {
          tool_id: string;
          name?: string;
          description?: string;
          code: string;
          input_schema: Record<string, unknown>;
          language: "TYPESCRIPT" | "PYTHON";
        };
        const result = await riza.tools.update(input.tool_id, input);
        return result;
      } else if (name === EXECUTE_CODE_TOOL.name) {
        const input = args as {
          code: string;
          language: "TYPESCRIPT" | "PYTHON";
        };
        const result = await riza.command.exec({
          code: input.code,
          language: input.language,
        });
        return result;
      } else if (name === LIST_TOOLS_TOOL.name) {
        const result = await riza.tools.list();
        return result;
      } else if (name === EXECUTE_TOOL.name) {
        const input = args as {
          tool_id: string;
          input: Record<string, unknown>;
        };
        const result = await riza.tools.exec(input.tool_id, {
          input: input.input,
        });
        return result;
      } else {
        throw new Error(`Unknown tool: ${name}`);
      }
    };

    try {
      const result = await getExecutionResult();
      return {
        content: [{ type: "text", text: JSON.stringify(result) }],
      };
    } catch (error) {
      printMessage(error);
      throw error;
    }
  }
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Riza MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
