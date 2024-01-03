export function mergeDataSets(
    dataSet1: Array<{ [key: string]: any }>,
    dataSet2: Array<{ [key: string]: any }>
): Array<{ [key: string]: any }> {
    // Create a map to store merged data with date as key
    const mergedDataMap: { [date: string]: { [key: string]: any } } = {}

    // Process dataSet1
    dataSet1.forEach((data) => {
        const date = data.date
        if (!mergedDataMap[date]) {
            mergedDataMap[date] = {}
        }
        Object.assign(mergedDataMap[date], data)
    })

    // Process dataSet2
    dataSet2.forEach((data) => {
        const date = data.date
        if (!mergedDataMap[date]) {
            mergedDataMap[date] = {}
        }
        Object.assign(mergedDataMap[date], data)
    })

    // Convert the map back to an array
    return Object.keys(mergedDataMap)
        .map((date) => ({ date, ...mergedDataMap[date] }))
        .sort((a, b) => a.date.localeCompare(b.date))
}
