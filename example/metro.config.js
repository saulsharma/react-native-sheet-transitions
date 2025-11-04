const path = require('path')
const { getDefaultConfig } = require('expo/metro-config')
const exclusionList = require('metro-config/src/defaults/exclusionList')

const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, '..')

const config = getDefaultConfig(projectRoot)

// Watch the parent's src directory
config.watchFolders = [path.resolve(workspaceRoot, 'src')]

// Let Metro know where to resolve packages
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
]

// Force Metro to resolve our local package from source
config.resolver.extraNodeModules = {
  'react-native-sheet-transitions': path.resolve(workspaceRoot, 'src'),
}

// Exclude parent's example folder from parent's node_modules to prevent circular references
config.resolver.blockList = exclusionList([
  // Exclude example folder when accessed from parent node_modules
  new RegExp(
    `${workspaceRoot.replace(/[/\\]/g, '[/\\\\]')}/node_modules/react-native-sheet-transitions/example/.*`
  ),
])

module.exports = config
