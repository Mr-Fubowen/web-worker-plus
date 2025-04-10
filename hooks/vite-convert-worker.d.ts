export interface ViteConvertWorkerOptions {
    /**
     * 需要包装为 Worker 的脚本目录
     */
    workerPath: string
    /**
     * 是否在脚本的同级目录下创建 Worker 文件
     */
    isCreateWorkerFile?: boolean
}

/**
 * Vite 插件函数，用于动态生成 Worker 相关文件
 */
export declare function viteConvertWorker(options: string | ViteConvertWorkerOptions): {
    enforce: 'pre'
    name: 'vite-convert-worker'
    buildStart: (options: any, bundle: any) => Promise<void>
}
