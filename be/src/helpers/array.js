export function getFirstArrayElement(array) {
    if (Array.isArray(array) && array.length > 0) {
        return array[0]
    } else {
        return null // or any other default value you prefer
    }
}

export function calculateAverage(array, propertyName, numberOfRecords = 10) {
    let total = 0
    let count = 0

    array.slice(0, numberOfRecords).forEach((item) => {
        const value = item[propertyName]
        if (typeof value === 'number') {
            total += value
            count++
        }
    })

    return count > 0 ? total / count : null
}
