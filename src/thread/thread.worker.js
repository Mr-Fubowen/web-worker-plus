import * as modules from './thread.module.js'

function decode(args) {
    return args?.map(it => {
        if (it.type === 'ARGS_FUNCTION') {
            return (...args) => {
                self.postMessage({
                    id: it.id,
                    type: it.type,
                    args
                })
            }
        }
        return it.value
    })
}

self.onmessage = async function (event) {
    const { id, module, method, args, isUrl } = event.data
    try {
        const context = {
            emit: (name, ...args) =>
                self.postMessage({
                    id: id,
                    type: 'EVENT',
                    name: name,
                    args
                })
        }
        let data
        if (isUrl) {
            const _module = await import(/* @vite-ignore */ module)
            data = await _module[method]?.call(context, ...args)
        } else {
            data = await invoke(context, module, method, decode(args))
        }
        self.postMessage({
            id,
            type: 'SUCCESS',
            data: data
        })
    } catch (error) {
        self.postMessage({
            id,
            type: 'ERROR',
            data: error
        })
    } finally {
        self.postMessage({
            id,
            type: 'FINALLY'
        })
    }
}

export function getOfThrow(value, msg) {
    if (value) {
        return value
    }
    throw new Error(msg)
}

export async function invoke(context, module, method, args) {
    const _module = getOfThrow(modules[module], module + ' module does not exist')
    const _method = getOfThrow(_module[method], method + ' method does not exist')
    return await _method.call(context, ...args)
}
