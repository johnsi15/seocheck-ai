export async function GET() {
  const data = {
    name: 'John Serrano',
    title: 'OpenAI',
  }

  return Response.json({ data, status: 200 })
}
