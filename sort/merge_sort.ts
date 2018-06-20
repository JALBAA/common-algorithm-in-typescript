import {default_compare} from './default_compare'

function merge<T> (collection: T[], compare: (v1: T, v2: T) => number = default_compare, start: number, end: number, pivot: number) {
    const temp: T[] = []
    let i = start
    let j = pivot + 1
    let loop = true
    // 双游标，i = 开始，j = 中位位置
    // 通过比较进位
    // O(n)
    while (loop) {
        if (i > pivot && j > end) {
            break
        } else if (i > pivot && j <= end) {
            temp.push(collection[j])
            j++
            continue
        } else if (j > end && i <= pivot) {
            temp.push(collection[i])
            i++
            continue
        }
        if (compare(collection[i], collection[j]) > 0) {
            temp.push(collection[i])
            i++
        } else if (compare(collection[i], collection[j]) < 0) {
            temp.push(collection[j])
            j++
        } else {
            if (i != j) {
                temp.push(collection[i])
                temp.push(collection[j])
                i++
                j++
            } else {
                temp.push(collection[j])
                j++
            }
        }
    }
    for (let i = start, j = 0; i <= end; i++, j++) {
        collection[i] = temp[j]
    }
}

export function merge_sort<T> (_collection: T[], copy: Boolean = false, compare: (v1: T, v2: T) => number = default_compare, start: number | null = null, end: number | null = null) {
    let collection
    if (copy) {
        collection = _collection.map(item => item)
    } else {
        collection = _collection
    }
    if (start == null) {
        start = 0
    }
    if (end == null) {
        end = collection.length - 1
    }
    const pivot = Math.floor((start + end) / 2)
    // 通过递归，先拆
    // 压栈拆。基本是通用手法，二叉树遍历也是这样
    if (start < pivot)
        merge_sort(collection, copy, compare, start, pivot)
    if (pivot < end)
        merge_sort(collection, copy, compare, pivot + 1, end)
    // 压倒最小数组，压不动了，就开始合
    // 弹栈的时候，小型数组已经合完了都
    if (start < end) {
        merge(collection, compare, start, end, pivot)
    }
    return collection
}