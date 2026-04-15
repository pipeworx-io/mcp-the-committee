# mcp-the-committee

the-committee MCP — wraps StupidAPIs (requires X-API-Key)

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `the_committee_convene` | Convenes five random number generators. Each argues for their number. Democracy determines the result. One member always dissents. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "the-committee": {
      "url": "https://gateway.pipeworx.io/the-committee/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use the-committee
```

## License

MIT
