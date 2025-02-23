const { env } = require('process');
function parseHeaders(s) {
  const headers = s.split(','); // Split by comma
  const result = {};

  headers.forEach(header => {
    const [key, value] = header.split('='); // Split by equal sign
    result[key.trim()] = value.trim(); // Add to the object, trimming spaces
  });

  return result;
}


let target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
    ? env.ASPNETCORE_URLS.split(';')[0]
    : 'https://localhost:7142';

if (env.DOTNET_DASHBOARD_URL) {
  target = env["services__myapi-server__https__0"];
}

const PROXY_CONFIG = [
  {
    context: ["/api/*"],
    target,
    secure: false, // env["NODE_ENV"] !== "development",
    pathRewrite: { "^/api": "" },
  }
];

if (env.DOTNET_DASHBOARD_URL) {
  PROXY_CONFIG.push({
    context: ["/v1/traces"],
    target: env["OTEL_EXPORTER_OTLP_ENDPOINT"],
    secure: env["NODE_ENV"] !== "development",
    headers: parseHeaders(env["OTEL_EXPORTER_OTLP_HEADERS"]),
  });
}

module.exports = PROXY_CONFIG;


