export function getFirstArrayElement(array) {
    if (Array.isArray(array) && array.length > 0) {
        return array[0]
    } else {
        return null // or any other default value you prefer
    }
}
