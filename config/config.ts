// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  devtool: 'source-map',
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [],
  nodeModulesTransform: {
    type: 'none',
  },
  forkTSChecker: {
    typescript: true,
  },
  headScripts: ['https://ssl.captcha.qq.com/TCaptcha.js'],
  externals: {
    captcha: 'window.TencentCaptcha',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
  extraBabelPlugins: [
    [
      'prismjs',
      {
        languages: [
          'markup',
          'markup-templating',
          'css',
          'less',
          'scss',
          'clike',
          'go',
          'javascript',
          'typescript',
          'jsx',
          'tsx',
          'python',
          'php',
          'java',
          'bash',
          'ini',
          'json',
          'sql',
          'yaml',
        ],
        plugins: ['line-numbers', 'show-language', 'copy-to-clipboard'],
        theme: 'default',
        css: true,
      },
    ],
  ],
});
