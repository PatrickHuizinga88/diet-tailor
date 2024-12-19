export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  return $fetch(`https://jsonplaceholder.typicode.com/users`, {
    method: 'POST',
    body: JSON.stringify(body)
  })
})