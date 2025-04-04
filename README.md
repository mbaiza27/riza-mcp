# Riza MCP Server

[Riza](https://riza.io) offers an isolated code interpreter for your LLM-generated code. 

Our MCP server implementation wraps the Riza API and presents
endpoints as individual tools.

Configure with Claude Desktop as below, or adapt as necessary for your MCP client. Get a free Riza API key in your [Riza Dashboard](https://dashboard.riza.io).

```json
{
  "mcpServers": {
    "riza-server": {
      "command": "npx",
      "args": [
        "@riza-io/riza-mcp"
      ],
      "env": {
        "RIZA_API_KEY": "your-api-key"
      }
    }
  }
}
```

## VS Code Installation

For one-click installation, click one of the install buttons below:

[![Install with NPX in VS Code](https://img.shields.io/badge/VS_Code-NPM-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=riza-server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22%40riza-io%2Friza-mcp%22%5D%2C%22env%22%3A%7B%22RIZA_API_KEY%22%3A%22%24%7Binput%3Ariza_api_key%7D%22%7D%7D&inputs=%5B%7B%22type%22%3A%22promptString%22%2C%22id%22%3A%22riza_api_key%22%2C%22description%22%3A%22Riza+API+Key%22%2C%22password%22%3Atrue%7D%5D) [![Install with NPX in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-NPM-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=riza-server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22%40riza-io%2Friza-mcp%22%5D%2C%22env%22%3A%7B%22RIZA_API_KEY%22%3A%22%24%7Binput%3Ariza_api_key%7D%22%7D%7D&inputs=%5B%7B%22type%22%3A%22promptString%22%2C%22id%22%3A%22riza_api_key%22%2C%22description%22%3A%22Riza+API+Key%22%2C%22password%22%3Atrue%7D%5D&quality=insiders)

### Manual Installation

If you prefer manual installation, you can click the install buttons at the top of this section, or follow these steps:

Add the following JSON block to your User Settings (JSON) file in VS Code. You can do this by pressing `Ctrl + Shift + P` and typing `Preferences: Open User Settings (JSON)`.

```json
{
  "mcp": {
    "inputs": [
      {
        "type": "promptString",
        "id": "riza_api_key",
        "description": "Riza API Key",
        "password": true
      }
    ],
    "servers": {
      "riza-server": {
        "command": "npx",
        "args": ["@riza-io/riza-mcp"],
        "env": {
          "RIZA_API_KEY": "${input:riza_api_key}"
        }
      }
    }
  }
}
```

Optionally, you can add it to a file called `.vscode/mcp.json` in your workspace. This will allow you to share the configuration with others.

```json
{
  "inputs": [
    {
      "type": "promptString", 
      "id": "riza_api_key",
      "description": "Riza API Key",
      "password": true
    }
  ],
  "servers": {
    "riza-server": {
      "command": "npx",
      "args": ["@riza-io/riza-mcp"],
      "env": {
        "RIZA_API_KEY": "${input:riza_api_key}"
      }
    }
  }
}
```

The Riza MCP server provides several tools to your LLM:

- `create_tool`: Your LLM can write code and save it as a tool using the Riza [Tools API](https://docs.riza.io/api-reference/tool/create-tool). It can then execute these tools securely on Riza using `execute_tool`.
- `fetch_tool`: Your LLM can fetch saved Riza tools, including source code, which can be useful for editing tools.
- `execute_tool`: Executes a saved tool securely on Riza's code interpreter API.
- `edit_tool`: Edits an existing saved tool.
- `list_tools`: Lists available saved tools.
- `execute_code`: Executes arbitrary code safely on Riza's code interpreter API, without saving it as a tool.
