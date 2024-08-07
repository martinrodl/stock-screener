export function getProperties(
    groupStatements: any[],
    properties: string[]
): Array<{ [key: string]: any; date: string }> {
    if (!Array.isArray(groupStatements)) {
        console.error('groupStatements should be an array of objects.')
        return []
    }

    console.log('properties ', properties)

    const result = groupStatements.map((statement) => {
        const data: { [key: string]: any; date: string } = { date: statement.date } // Initialize with date
        properties.forEach((property) => {
            if (Object.prototype.hasOwnProperty.call(statement, property)) {
                console.log('Property exists:', property, statement[property])
                data[property] = statement[property]
            } else {
                console.warn(
                    `Property ${property} does not exist on statement. Setting value to 0.`,
                    statement
                )
                data[property] = null // Set the value to 0 if the property doesn't exist
            }
        })
        return data
    })

    return result.reverse()
}
