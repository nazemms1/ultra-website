export async function fetchAPI(endpoint: string, locale: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://127.0.0.1:8000'
  const url = `${baseUrl}${endpoint}`

  try {
    const response = await fetch(url, {
      headers: {
        'Accept-Language': locale,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 }, // Cache for 60 seconds, or adjust as needed
    })

    if (!response.ok) {
      console.error(`Failed to fetch API: ${url} (status: ${response.status})`)
      return null
    }

    const json = await response.json()
    return json.data
  } catch (error) {
    console.error(`Error fetching API: ${url}`, error)
    return null
  }
}
