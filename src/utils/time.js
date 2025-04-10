export const toFriendlySize = num => {
    if (isNaN(num)) {
        return '-'
    }
    if (num == 0) {
        return '0 B'
    }
    const units = [' B', ' KB', ' MB', ' GB', ' TB']
    for (let index = units.length - 1; index >= 0; index--) {
        const unit = units.at(index)
        const min = Math.pow(1024, index)
        const times = num / min
        if (times >= 1) {
            return Math.ceil(times * 100) / 100 + unit
        }
    }
}

export const time = num => {
    if (isNaN(num)) {
        return '-'
    }
    if (num == 0) {
        return '0 毫秒'
    }
    const units = [
        {
            unit: ' 毫秒',
            size: 1
        },
        {
            unit: ' 秒',
            size: 1000
        },
        {
            unit: ' 分钟',
            size: 1 * 60 * 1000
        }
    ]
    for (let index = units.length - 1; index >= 0; index--) {
        const unit = units.at(index)
        const min = unit.size
        const times = num / min
        if (times >= 1) {
            return Math.ceil(times * 100) / 100 + unit.unit
        }
    }
}
