export const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Months are 0-indexed
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
}
