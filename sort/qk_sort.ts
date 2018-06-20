import {default_compare} from './default_compare'

function switch_pos<T> (collection: T[], i: number, j: number) {
    const temp = collection[i]
    collection[i] = collection[j]
    collection[j] = temp 
}
// 中位数选取
// method 2 
function another_partition<T> (collection: T[], compare: (v1: T, v2: T) => number, start: number, end: number) : number {
    let pivot = Math.floor((start + end) / 2)
    let i = start
    let j = end
    switch_pos(collection, pivot, end)
    let store = start
    while (i < end) {
        if (compare(collection[i], collection[end]) > 0) {
            switch_pos(collection, store, i)
            store++
        }
        i++
    }
    switch_pos(collection, store, end)
    return store
}
// method 1
function partition<T> (collection: T[], compare: (v1: T, v2: T) => number, start: number, end: number) : number {
    let pivot = Math.floor((start + end) / 2)
    let i = start
    let j = end
    while (i < j) {
        // c[i] < c[p]
        if (compare(collection[i] , collection[pivot]) >= 0) {
            if (i < pivot) {
                i++
                continue
            }
        }
        // c[j] > c[p]
        if (compare(collection[pivot], collection[j]) >= 0) {
            if (j > pivot) {
                j--
                continue
            }
        }
        switch_pos(collection, i, j)
        // 左侧多余或者右侧多余的时候
        // 要更新pivot的位置
        // 因为pivot之前指向的值和另一侧的值发生了交换
        if (i == pivot) {
            pivot = j
        } else if (j == pivot) {
            pivot = i
        }
    }
    return pivot
}

export function qk_sort<T> (collection: T[], copy: Boolean = false, compare: (v1: T, v2: T) => number = default_compare, start: number | null = null, end: number | null = null) {
    if (start == null) {
        start = 0
    }
    if (end == null) {
        end = collection.length - 1
    }
    let pivot = partition(collection, compare, start, end)
    if (start < pivot)
        qk_sort(collection, copy, compare, start, pivot)
    if (pivot < end - 1)
        qk_sort(collection, copy, compare, pivot + 1, end)
}