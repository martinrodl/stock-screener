export const addCondition = (andConditions, field, min, max) => {
    if (min !== undefined || max !== undefined) {
        andConditions.push({
            [field]: {
                ...(min !== undefined && { $gte: parseFloat(min) }),
                ...(max !== undefined && { $lte: parseFloat(max) }),
            },
        })
    }
}
