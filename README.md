# Minimal Fastify Lambda

There are 3 handlers with different setups

- `index.handler` is for `BUFFERED` lambda function URL's via https://github.com/H4ad/serverless-adapter
- `index.stream` is for `RESPONSE_STREAM` lambda function URL's vis https://github.com/H4ad/serverless-adapter
- `index.proxy` is for `BUFFERED` lambda function URL's via https://github.com/fastify/aws-lambda-fastify
