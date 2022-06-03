const path = require('path')
const keychain = require('../packages/keychain/package.json')
const expoQrScanner = require('../packages/expo-qr-scanner/package.json')

const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, '..')

module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.tsx', '.ts', '.js', '.json'],
          alias: {
            [keychain.name]: path.join(workspaceRoot, 'packages/keychain', keychain.source),
            [expoQrScanner.name]: path.join(workspaceRoot, 'packages/expo-qr-scanner', expoQrScanner.source),
          },
        },
      ],
    ],
  }
}
