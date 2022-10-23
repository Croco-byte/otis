module.exports = {
    // For better-sqlite: https://github.com/WiseLibs/better-sqlite3/issues/488
    configureWebpack: config => {
        config.externals = {
            'better-sqlite3-with-prebuilds': 'commonjs better-sqlite3-with-prebuilds'
        };
    },
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.ts',
      externals: [ 'better-sqlite3-with-prebuilds' ]
      // Or, for multiple preload files:
      //preload: { preload: 'src/preload.ts', otherPreload: 'src/preload2.js' }
    }
  }
}
