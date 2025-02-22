var builder = DistributedApplication.CreateBuilder(args);

var weatherApi = builder.AddProject<Projects.MyApi_Server>("myapi-server")
    ;


builder.AddNpmApp("angular", "../MyApi/myapi.client")
    .WithReference(weatherApi)
    .WaitFor(weatherApi)
    //.WithHttpEndpoint(env: "PORT", port: 4199)
    .WithHttpsEndpoint(env: "PORT", port: 4201)
    .WithExternalHttpEndpoints();



//builder.AddNpmApp("angular", "../MyApi/myapi.client")
//    .WithReference(weatherApi)
//    .WaitFor(weatherApi)
//    .WithEnvironment("PORT", "4201")
//    .WithEndpoint(4201)
//    .WithHttpsEndpoint(env: "PORT")
//    .PublishAsDockerFile();

builder.Build().Run();
