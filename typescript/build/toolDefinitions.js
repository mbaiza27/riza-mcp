export const CREATE_TOOL_TOOL = {
    name: "create_tool",
    description: "Create a new tool. This tool will be used to create new tools. You can use the tools you have created to perform tasks.",
    inputSchema: {
        type: "object",
        required: ["name", "description", "code", "input_schema", "language"],
        properties: {
            name: {
                type: "string",
                description: "The name of the tool you are writing. This is what you will use to call the tool.",
            },
            description: {
                type: "string",
                description: "A description of the tool you are writing. This will help you or other agents or people pick the appropriate tool in the future.",
            },
            code: {
                type: "string",
                description: "The Typescript code for the tool you are writing. The code should be a valid Typescript function named `execute` that takes one argument called `input`. When called, the `input` provided will match the schema of the `input_schema` of the tool.",
            },
            input_schema: {
                type: "object",
                description: "The input schema for the tool. This must be provided as a valid JSON Schema object.",
            },
            language: {
                type: "string",
                description: "The language of the tool you are writing. This must be either 'TYPESCRIPT' or 'PYTHON'.",
            },
        },
    },
};
export const FETCH_TOOL_TOOL = {
    name: "fetch_tool",
    description: "Fetch a tool, including its source code.",
    inputSchema: {
        type: "object",
        properties: {
            tool_id: { type: "string", description: "The ID of the tool to fetch." },
        },
    },
};
export const EDIT_TOOL_TOOL = {
    name: "edit_tool",
    description: "Edit a tool, including its source code. Omit properties that you do not want to change.",
    inputSchema: {
        type: "object",
        required: ["tool_id", "code", "language", "input_schema"],
        properties: {
            tool_id: {
                type: "string",
                description: "The ID of the tool you are editing.",
            },
            name: {
                type: "string",
                description: "The name of the tool you are editing. This is what you will use to call the tool.",
            },
            description: {
                type: "string",
                description: "A description of the tool you are editing. This will help you or other agents or people pick the appropriate tool in the future.",
            },
            code: {
                type: "string",
                description: "The Typescript code for the tool you are editing. The code should be a valid Typescript function named `execute` that takes one argument called `input`. When called, the `input` provided will match the schema of the `input_schema` of the tool.",
            },
            input_schema: {
                type: "object",
                description: "The input schema for the tool. This must be provided as a valid JSON Schema object.",
            },
            language: {
                type: "string",
                description: "The language of the tool you are editing. This must be either 'TYPESCRIPT' or 'PYTHON'.",
            },
        },
    },
};
export const EXECUTE_CODE_TOOL = {
    name: "execute_code",
    description: "Execute arbitrary Typescript or Python code.",
    inputSchema: {
        type: "object",
        properties: {
            code: {
                type: "string",
                description: "The code you are writing. This will be executed as a script. Write any output to stdout or stderr.",
            },
            language: {
                type: "string",
                description: "The language of the code you are writing. This must be either 'TYPESCRIPT' or 'PYTHON'.",
            },
        },
    },
};
export const LIST_TOOLS_TOOL = {
    name: "list_tools",
    description: "Lists the tool definitions of all self-written tools available for use. These tools can be used by calling `use_tool` with the name and input.",
    inputSchema: {
        type: "object",
        properties: {},
    },
};
export const EXECUTE_TOOL = {
    name: "execute_tool",
    description: "Executes a tool. This tool will be used to execute a self-written tool.",
    inputSchema: {
        type: "object",
        required: ["tool_id", "input"],
        properties: {
            tool_id: {
                type: "string",
                description: "The ID of the tool you are executing.",
            },
            input: {
                type: "object",
                description: "The input to the tool. This must match the input schema of the tool.",
            },
        },
    },
};
