import fs from 'fs-extra'
import { join, basename, extname } from 'path'
import { fileURLToPath } from 'url'
import { format } from 'util'

const tablePath = fileURLToPath(new URL('../src/thread/thread.module.js', import.meta.url))

async function createWorker(options) {
    const opts = {
        workerPath: '',
        isCreateWorkerFile: false
    }
    if (typeof options === 'string' || options instanceof String) {
        opts.workerPath = options
    } else {
        Object.assign(opts, options)
    }
    const files = await fs.readdir(opts.workerPath)
    const modules = ['export * as hashCode from "../utils/hashCode.js"']
    for (const it of files) {
        if (it.endsWith('.worker.js')) {
            continue
        }
        if (it.endsWith('.js')) {
            const ext = extname(it)
            const name = basename(it, ext)
            const scriptPath = join(opts.workerPath, it)
            const fileUrl = new URL('file:///' + scriptPath).href
            const text = format('export * as %s from "%s"', name, fileUrl)
            modules.push(text)
        }
    }
    const content = modules.join('\n')
    await fs.outputFile(tablePath, content, { encoding: 'utf-8' })
}
export function viteConvertWorker(options) {
    return {
        enforce: 'pre',
        name: 'vite-convert-worker',
        async buildStart() {
            return await createWorker(options)
        }
    }
}
export default viteConvertWorker
