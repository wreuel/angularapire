

module.exports = {
  "/api": {
    target: process.env["services__myapi-server__https__0"],
    secure: process.env["NODE_ENV"] !== "development",
    pathRewrite: {
      "^/api": "",
    },
  }
  ,
  "/v1/traces": {
    target: process.env["OTEL_EXPORTER_OTLP_ENDPOINT"],
    secure: process.env["NODE_ENV"] !== "development",
    headers: parseHeaders(process.env["OTEL_EXPORTER_OTLP_HEADERS"]),
  },
};

function parseHeaders(s) {
  const headers = s.split(','); // Split by comma
  const result = {};

  headers.forEach(header => {
      const [key, value] = header.split('='); // Split by equal sign
      result[key.trim()] = value.trim(); // Add to the object, trimming spaces
  });

  return result;
}


 //const { env } = require('process');

 //let target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
 //  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7142';

 //if (env.DOTNET_DASHBOARD_URL) {
 //  console.log("Wesley exist dash", env["services__myapi-server__https__0"]);
 //  target = env["services__myapi-server__https__0"];
 ////  console.log("Wesley exist dash, so ", env.services__myapi - server__https__0);

 //}

 //console.log("Wesley the env", env);
 //console.log("Wesley",target);
 //const PROXY_CONFIG = [
 //  {
 //    context: [
 //      "/weatherforecast",
 //    ],
 //    target,
 //    secure: false,
 //    pathRewrite: {
 //      "^/api": "",
 //    }
 //  }
 //]

 //module.exports = PROXY_CONFIG;
