const target = "http://localhost:5200/" 

export default [
  {
    context: [,
      "/_content",
      "/_framework",
      "/_blazor",
    ],
    proxyTimeout: 3000,
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  },
  {
    context: [
      "/_blazor"
    ],
    target: target,
    secure: false,
    ws: true,
    logLevel: "debug"
  }
];