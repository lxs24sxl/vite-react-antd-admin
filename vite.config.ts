import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import fs from 'fs'
import reactRefresh from '@vitejs/plugin-react-refresh'
import styleImport from 'vite-plugin-style-import'
// import analyze from 'rollup-plugin-analyzer'
import visualizer from 'rollup-plugin-visualizer'
import lessVarsToJs from 'less-vars-to-js'
import vitePluginHtmlEnv from 'vite-plugin-html-env'

export const _resolve = dir => path.resolve(__dirname, dir)

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const {
    VITE_APP_PORT,
    VITE_APP_API,
    VITE_APP_PRODUCTION_SOURCE_MAP,
    VITE_APP_OUTPUT_DIR,
    VITE_APP_ANALYSIS,
    VITE_APP_PUBLIC_PATH
  } = loadEnv(mode, process.cwd())

  const plugins = [
    reactRefresh(), // hmr
    styleImport({
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name) => {
            return `antd/es/${name}/style/index`;
          }
        }
      ]
    }),
    vitePluginHtmlEnv()
  ]

  // 是否要分析
  if (VITE_APP_ANALYSIS) {
    plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true
      })
    )
  }

  return defineConfig({
    mode: command === 'serve' ? 'development' : 'production',

    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: lessVarsToJs(fs.readFileSync(_resolve('./src/assets/less/theme.less'), 'utf-8'))
        }
      },
      modules: {
        scopeBehaviour: 'local',
        localsConvention: 'camelCase'
      },
      postcss: {
        plugins: [
          require('autoprefixer')
        ]
      }
    },

    plugins,

    base: VITE_APP_PUBLIC_PATH,

    resolve: {
      alias: {
        '@': _resolve('./src'),
        'components': _resolve('./src/components'),
        'vo-hooks': _resolve('./src/hooks/index')
      }
    },

    build: {
      // 指定输出路径，默认'dist'
      outDir: VITE_APP_OUTPUT_DIR || 'dist',
      // 构建后是否生成source map文件，默认false
      sourcemap: VITE_APP_PRODUCTION_SOURCE_MAP ? !!+VITE_APP_PRODUCTION_SOURCE_MAP : false,
      // 指定生成静态资源的存放路径(相对于build.outDir)
      assetsDir: 'assets',
      // 小于此阈值的导入或引用资源将内联为base64编码，设置为0可禁用此项。默认4096（4kb）
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('lodash')) {
              return 'lodash'
            } else if (id.includes('antd') || id.includes('@ant-design')) {
              return 'antd'
            } else if (id.includes('node_modules')) {
              // return id.toString().split('node_modules/')[1].split('/')[0].toString()
              return 'vendor'
            }
          }
        }
      }
    },

    server: {
      // hmr: false,
      port: VITE_APP_PORT ? +VITE_APP_PORT : 3000,
      proxy: {
        '/server': {
          target: VITE_APP_API || 'https://testserver.***.com.cn',
          secure: false,
          rewrite: path => path.replace(/^\/server/, '')
        }
      }
    }
  })
}
