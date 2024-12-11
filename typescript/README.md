# Riza MCP Server

[Riza](https://riza.io) offers a sandboxed code execution environment for your LLM-generated code. 

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
