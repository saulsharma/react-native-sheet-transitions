const path = require('path')
const { getDefaultConfig } = require('expo/metro-config')

const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, '..')

const config = getDefaultConfig(projectRoot)

// Watch all files in the workspace
config.watchFolders = [workspaceRoot]

// Let Metro know where to resolve packages
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
]

// Force Metro to resolve our local package from source
config.resolver.extraNodeModules = {
  'react-native-sheet-transitions': path.resolve(workspaceRoot, 'src'),
}

module.exports = config
