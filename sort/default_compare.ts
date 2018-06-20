export function default_compare<T> (v1: T, v2: T) : number {
    if (typeof v1 != 'number') {
        throw new Error('无效的比较类型')
    } else {
        if (v1 < v2) {
            return 1
        } else if (v1 > v2) {
            return -1
        } else {
            return 0
        }
    }
}