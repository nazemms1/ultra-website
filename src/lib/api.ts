export async function fetchAPI(endpoint: string, locale: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://127.0.0.1:8000'
  console.log('API Base URL:', baseUrl)
  const url = `${baseUrl}${endpoint}`

  try {
    const response = await fetch(url, {
      headers: {
        'Accept-Language': locale,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
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
