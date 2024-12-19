export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    return $fetch(`https://jsonplaceholder.typicode.com/users/${body.id}`, {
        method: 'PUT',
        body: JSON.stringify(body)
    })
})