export const getBooks = async ({ q, skip }) => {
    const result = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q || 'books'}&startIndex=${skip || 0}`).then(item => item.json())
    return result
}

export const getDetailBook = async (id) => {
    const result = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`).then(item => item.json())
    return result
}