import type { Criterion } from '$lib/src/client'
import { isNull, isNotNull, stringify } from './utils'

export const check = {
    isLike:                 (entry: unknown, value: unknown)        => stringify(entry).indexOf(stringify(value)) > -1,
    isNotLike:              (entry: unknown, value: unknown)        => stringify(entry).indexOf(stringify(value)) === -1,
    startsWith:             (entry: unknown, value: unknown)        => stringify(entry).startsWith(stringify(value)),
    endsWith:               (entry: unknown, value: unknown)        => stringify(entry).endsWith(stringify(value)),
    isEqualTo:              (entry: unknown, value: unknown)        => stringify(entry) === stringify(value),
    isNotEqualTo:           (entry: unknown, value: unknown)        => stringify(entry) !== stringify(value),
    isGreaterThan:          (entry: number, value: number)          => isNull(entry) ? false : (entry > value),
    isGreaterThanOrEqualTo: (entry: number, value: number)          => isNull(entry) ? false : (entry >= value),
    isLessThan:             (entry: number, value: number)          => isNull(entry) ? false : (entry < value),
    isLessThanOrEqualTo:    (entry: number, value: number)          => isNull(entry) ? false : (entry <= value),
    isBetween:              (entry: number, [min, max]: number[])   => isNull(entry) ? false : (entry >= min && entry <= max),
    isStrictlyBetween:      (entry: number, [min, max]: number[])   => isNull(entry) ? false : (entry > min && entry < max),
    isTrue:                 (entry: boolean, _: unknown)            => entry === true,
    isFalse:                (entry: boolean, _: unknown)            => entry === false,
    isNull:                 (entry: null, _: unknown)               => isNull(entry),
    isNotNull:              (entry: unknown, _: unknown)            => isNotNull(entry),

    whereIn: (entry: unknown, values: Criterion[] = []) => {
        if (isNull(entry)) return false
        if (values.length === 0) return false
        for(const { value, check } of values) {
            if (check(entry, value)) {
                return true
            }
        }
        return false
    },

    match: (entry: unknown, pattern: string) => {
        const match = pattern.match(/^([\/~@;%#'])(.*?)\1([gimsuy]*)$/)
        const regex = match ? new RegExp(match[2], match[3]
              .split('')
              .filter((char, pos, flagArr) => flagArr.indexOf(char) === pos)
              .join('')
          ) 
          : new RegExp(pattern)
        return stringify(entry).match(regex) ? true : false
    }
}
