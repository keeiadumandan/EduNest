// Small fetch wrapper shared by all components.
async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`${res.status} ${res.statusText}${text ? ' - ' + text : ''}`)
  }
  if (res.status === 204) return null
  const text = await res.text()
  return text ? JSON.parse(text) : null
}

export const api = {
  list: (resource) => request(`/api/${resource}`),
  create: (resource, body) =>
    request(`/api/${resource}`, { method: 'POST', body: JSON.stringify(body) }),
  update: (resource, id, body) =>
    request(`/api/${resource}/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  remove: (resource, id) => request(`/api/${resource}/${id}`, { method: 'DELETE' }),
}

// Helpers for turning form strings into numbers (empty string -> null).
export const num = (v) => (v === '' || v === null || v === undefined ? null : Number(v))
