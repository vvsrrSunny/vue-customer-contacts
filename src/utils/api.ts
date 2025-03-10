export function makeEndPoint(filters: { name: string; value: string }[]): string {
  if (filters.length === 0) return ''

  return '?' + filters.map(f => `${encodeURIComponent(f.name)}=${encodeURIComponent(f.value)}`).join('&')
}
