# Web Worker Plus

### 介绍

基于 Web Worker 实现的后台计算方法，提供了 Vite 插件，可让 Vite 项目中的 JS 模块多线程运行

Vite 插件的独立版本[Rollup-Plugin-Worker-Plus](https://www.npmjs.com/package/rollup-plugin-worker-plus)
1. npm i -D rollup-plugin-worker-plus
2. [Rollup-Plugin-Worker-Plus](https://www.npmjs.com/package/rollup-plugin-worker-plus) 为纯开发插件

### 注意

只有在生产版本才有效，开发版本 Vite 不会处理 node_modules 中的 Web Worker 文件，因此开发环境无效

### 使用

目前具有两种使用方法，分别是 Vite 插件的方式和使用内置模块

#### Vite 插件方式

```js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { viteConvertWorker } from 'web-worker-enhance/hooks/vite-convert-worker'

const workerPath = fileURLToPath(new URL('./src/utils', import.meta.url))
export default defineConfig({
    plugins: [
        vue(), 
        vueDevTools(), 
        viteConvertWorker(workerPath)],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
```

#### 内置模块

-   hashCode 计算文件哈希码
    1. hashCode(file,onProgress)
    2. toStreamChunk(file, fn)

```js
import { Thread } from 'web-worker-plus'

await Thread.run('hashCode', 'hashCode', [file,progress=>{}], {
    isNewThread: false,
    timeout: -1
})
await Thread.runAs('hashCode', 'hashCode', file,progress=>{})
await Thread.runAsNew('hashCode', 'hashCode', file,progress=>{})
```
