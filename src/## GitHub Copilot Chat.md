## GitHub Copilot Chat

- Extension: 0.37.9 (prod)
- VS Code: 1.109.5 (072586267e68ece9a47aa43f8c108e0dcbf44622)
- OS: win32 10.0.19045 x64
- GitHub Account: kkhalled

## Network

User Settings:
```json
  "http.systemCertificatesNode": true,
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: Error (1 ms): getaddrinfo ENOTFOUND api.github.com
- DNS ipv6 Lookup: timed out after 10 seconds
- Proxy URL: None (1 ms)
- Electron fetch (configured): timed out after 10 seconds
- Node.js https: Error (14 ms): Error: getaddrinfo ENOTFOUND api.github.com
    at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)
- Node.js fetch: Error (24 ms): TypeError: fetch failed
    at node:internal/deps/undici/undici:14900:13
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at n._fetch (c:\Users\TMC\.vscode\extensions\github.copilot-chat-0.37.9\dist\extension.js:4862:26129)
    at n.fetch (c:\Users\TMC\.vscode\extensions\github.copilot-chat-0.37.9\dist\extension.js:4862:25777)
    at u (c:\Users\TMC\.vscode\extensions\github.copilot-chat-0.37.9\dist\extension.js:4894:190)
    at CA.h (file:///c:/Users/TMC/AppData/Local/Programs/Microsoft%20VS%20Code/072586267e/resources/app/out/vs/workbench/api/node/extensionHostProcess.js:116:41743)
  Error: getaddrinfo ENOTFOUND api.github.com
      at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)

Connecting to https://api.githubcopilot.com/_ping:
- DNS ipv4 Lookup: Error (1 ms): getaddrinfo ENOTFOUND api.githubcopilot.com
- DNS ipv6 Lookup: timed out after 10 seconds
- Proxy URL: None (9 ms)
- Electron fetch (configured): timed out after 10 seconds
- Node.js https: Error (27 ms): Error: getaddrinfo ENOTFOUND api.githubcopilot.com
    at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)
- Node.js fetch: Error (70 ms): TypeError: fetch failed
    at node:internal/deps/undici/undici:14900:13
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at n._fetch (c:\Users\TMC\.vscode\extensions\github.copilot-chat-0.37.9\dist\extension.js:4862:26129)
    at n.fetch (c:\Users\TMC\.vscode\extensions\github.copilot-chat-0.37.9\dist\extension.js:4862:25777)
    at u (c:\Users\TMC\.vscode\extensions\github.copilot-chat-0.37.9\dist\extension.js:4894:190)
    at CA.h (file:///c:/Users/TMC/AppData/Local/Programs/Microsoft%20VS%20Code/072586267e/resources/app/out/vs/workbench/api/node/extensionHostProcess.js:116:41743)
  Error: getaddrinfo ENOTFOUND api.githubcopilot.com
      at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)

Connecting to https://copilot-proxy.githubusercontent.com/_ping:
- DNS ipv4 Lookup: Error (1 ms): getaddrinfo ENOTFOUND copilot-proxy.githubusercontent.com
- DNS ipv6 Lookup: Error (2 ms): getaddrinfo ENOTFOUND copilot-proxy.githubusercontent.com
- Proxy URL: None (12 ms)
- Electron fetch (configured): timed out after 10 seconds
- Node.js https: Error (23 ms): Error: getaddrinfo ENOTFOUND copilot-proxy.githubusercontent.com
    at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)
- Node.js fetch: Error (26 ms): TypeError: fetch failed
    at node:internal/deps/undici/undici:14900:13
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at n._fetch (c:\Users\TMC\.vscode\extensions\github.copilot-chat-0.37.9\dist\extension.js:4862:26129)
    at n.fetch (c:\Users\TMC\.vscode\extensions\github.copilot-chat-0.37.9\dist\extension.js:4862:25777)
    at u (c:\Users\TMC\.vscode\extensions\github.copilot-chat-0.37.9\dist\extension.js:4894:190)
    at CA.h (file:///c:/Users/TMC/AppData/Local/Programs/Microsoft%20VS%20Code/072586267e/resources/app/out/vs/workbench/api/node/extensionHostProcess.js:116:41743)
  Error: getaddrinfo ENOTFOUND copilot-proxy.githubusercontent.com
      at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)

Connecting to https://mobile.events.data.microsoft.com: Error (3289 ms): Error: net::ERR_NAME_NOT_RESOLVED
    at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
    at SimpleURLLoaderWrapper.emit (node:events:519:28)
  [object Object]
  {"is_request_error":true,"network_process_crashed":false}
Connecting to https://dc.services.visualstudio.com: timed out after 10 seconds
Connecting to https://copilot-telemetry.githubusercontent.com/_ping: Error (15 ms): Error: getaddrinfo ENOTFOUND copilot-telemetry.githubusercontent.com
    at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)
Connecting to https://copilot-telemetry.githubusercontent.com/_ping: Error (18 ms): Error: getaddrinfo ENOTFOUND copilot-telemetry.githubusercontent.com
    at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)
Connecting to https://default.exp-tas.com: Error (25 ms): Error: getaddrinfo ENOTFOUND default.exp-tas.com
    at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)

Number of system certificates: 85

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).