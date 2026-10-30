const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const createConfig = require('../webpack.config');

process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';

async function start() {
  const config = await createConfig({ projectRoot: process.cwd(), mode: 'development' });
  const options = {
    ...config.devServer,
    host: '0.0.0.0',
    port: Number(process.env.WORKING_METRO_PORT),
    allowedHosts: (process.env.PREVIEW_ALLOWED_HOSTS || 'localhost').split(','),
    headers: { ...config.devServer?.headers, 'Access-Control-Allow-Origin': '*' },
  };
  await new WebpackDevServer(options, webpack(config)).start();
}
start().catch(error => { console.error(error); process.exit(1); });
