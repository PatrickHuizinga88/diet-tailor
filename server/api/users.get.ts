export default defineEventHandler(async (event) => {
    const { id } = getQuery(event)

    if (id) {
        return await $fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    } else {
        return await $fetch('https://jsonplaceholder.typicode.com/users')
    }
})