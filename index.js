const app = require('fastify')({ logger: true });
const { ServerlessAdapter, createDefaultLogger } = require('@h4ad/serverless-adapter');
const { ApiGatewayV2Adapter } = require('@h4ad/serverless-adapter/lib/adapters/aws');
const { FastifyFramework } = require('@h4ad/serverless-adapter/lib/frameworks/fastify');
const { AwsStreamHandler } = require('@h4ad/serverless-adapter/lib/handlers/aws');
const { DefaultHandler } = require('@h4ad/serverless-adapter/lib/handlers/default');
const { DummyResolver } = require('@h4ad/serverless-adapter/lib/resolvers/dummy');
const { PromiseResolver } = require('@h4ad/serverless-adapter/lib/resolvers/promise');
const awsLambdaFastify = require('@fastify/aws-lambda');

app.get('/hello', async (request, reply) => {
  return { hello: 'world' };
});

exports.stream = ServerlessAdapter.new(app)
  .setFramework(new FastifyFramework())
  .setLogger(createDefaultLogger({ level: 'debug' }))
  .setResolver(new DummyResolver())
  .setHandler(new AwsStreamHandler())
  .addAdapter(new ApiGatewayV2Adapter())
  .build();

exports.handler = ServerlessAdapter.new(app)
  .setFramework(new FastifyFramework())
  .setLogger(createDefaultLogger({ level: 'debug' }))
  .setResolver(new PromiseResolver())
  .setHandler(new DefaultHandler())
  .addAdapter(new ApiGatewayV2Adapter())
  .build();

const proxy = awsLambdaFastify(app);

exports.proxy = proxy;
