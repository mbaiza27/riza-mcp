# Riza MCP Server

[Riza](https://riza.io) offers a sandboxed code execution environment for your LLM-generated code. 

Our MCP server implementation wraps the Riza API and presents
endpoints as individual tools.

Configure with Claude Desktop as below, or adapt as necessary for your MCP client. Get a free Riza API key in your [Riza Dashbard](https://dashboard.riza.io).

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
