import { blake2bInit, blake2bUpdate, blake2bFinal } from 'blakejs'
import { toHexString } from './byte'

export async function toStreamChunk(file, fn) {
    let reader = file.stream().getReader()
    let result = await reader.read()
    while (!result.done) {
        const chunk = result.value
        fn(chunk)
        result = await reader.read()
    }
}
export async function hashCode(file, cb) {
    const blake2b = blake2bInit(32)
    const total = file.size
    let current = 0
    let start = Date.now()
    await toStreamChunk(file, chunk => {
        blake2bUpdate(blake2b, chunk)
        current += chunk.length
        const time = Date.now()
        cb?.({
            duration: time - start,
            timestamp: time,
            length: chunk.length,
            current,
            total,
            percentage: Math.round((current / total) * 100)
        })
    })
    return toHexString(blake2bFinal(blake2b))
}
