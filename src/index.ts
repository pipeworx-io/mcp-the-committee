interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * the-committee MCP — wraps StupidAPIs (requires X-API-Key)
 *
 * Convenes five random number generators. Each argues for their number. Democracy 
 */


const API_KEY = '6e0ddbe88486dc354370290979829dc892b0386bd789ae5a';

const tools: McpToolExport['tools'] = [
  {
    name: 'the_committee_convene',
    description: 'Convenes five random number generators. Each argues for their number. Democracy determines the result. One member always dissents.',
    inputSchema: {
      type: 'object' as const,
      properties: {"question": {"type": "string", "description": "The question before the committee. Optional."}, "urgency": {"type": "string", "enum": ["routine", "urgent", "emergency"], "description": "Meeting urgency"}},
      required: [],
    },
  },
];

async function callApi(url: string, args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(args)) {
    if (v !== undefined && v !== null && v !== '') {
      params.set(k, String(v));
    }
  }
  const fullUrl = params.toString() ? url + '?' + params.toString() : url;
  const res = await fetch(fullUrl, {
    headers: { 'X-API-Key': API_KEY },
  });
  if (!res.ok) throw new Error('the-committee API error: ' + res.status);
  return res.json();
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'the_committee_convene':
      return callApi('https://api.stupidapis.com/the-committee/convene', args);
    default:
      throw new Error('Unknown tool: ' + name);
  }
}

export default { tools, callTool } satisfies McpToolExport;
