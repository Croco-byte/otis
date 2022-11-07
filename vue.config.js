module.exports = {
    // For better-sqlite: https://github.com/WiseLibs/better-sqlite3/issues/488
    configureWebpack: config => {
        config.externals = {
            'better-sqlite3': 'commonjs better-sqlite3'
        };
    },
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.ts',
      externals: [ 'better-sqlite3' ],
      builderOptions: {
        win: {
          icon: './logo.ico'
        },
        linux: {
          icon: './logo.ico'
        }
      }

      // Or, for multiple preload files:
      //preload: { preload: 'src/preload.ts', otherPreload: 'src/preload2.js' }
    }
  },
}
