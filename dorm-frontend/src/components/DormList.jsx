import { useEffect, useState } from 'react'
import { api, num } from '../api.js'

const NOISE_LEVELS = ['SILENT', 'QUIET', 'MODERATE', 'LOUD'] // adjust to match your backend enum
const EMPTY = {
  name: '', address: '', distanceToCampusKm: '', basePrice: '',
  overallNoiseLevel: 'QUIET', contactEmail: '',
}

export default function DormList() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(EMPTY)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      setItems(await api.list('dorms'))
      setError('')
    } catch (e) {
      setError(`Could not load dorms: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { load() }, [])

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const reset = () => { setForm(EMPTY); setEditingId(null) }

  const onSubmit = async (e) => {
    e.preventDefault()
    const body = {
      name: form.name,
      address: form.address,
      distanceToCampusKm: num(form.distanceToCampusKm),
      basePrice: num(form.basePrice),
      overallNoiseLevel: form.overallNoiseLevel,
      contactEmail: form.contactEmail,
    }
    try {
      if (editingId !== null) await api.update('dorms', editingId, { ...body, dormId: editingId })
      else await api.create('dorms', body)
      reset()
      load()
    } catch (err) {
      setError(`Could not save dorm: ${err.message}`)
    }
  }

  const onEdit = (d) => {
    setEditingId(d.dormId)
    setForm({
      name: d.name ?? '', address: d.address ?? '',
      distanceToCampusKm: d.distanceToCampusKm ?? '', basePrice: d.basePrice ?? '',
      overallNoiseLevel: d.overallNoiseLevel ?? 'QUIET', contactEmail: d.contactEmail ?? '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onDelete = async (id) => {
    if (!window.confirm('Delete this dorm?')) return
    try {
      await api.remove('dorms', id)
      if (editingId === id) reset()
      load()
    } catch (err) {
      setError(`Could not delete dorm: ${err.message}`)
    }
  }

  return (
    <section>
      <h2>Dorms</h2>
      {error && <div className="error">{error}</div>}

      <form className="form" onSubmit={onSubmit}>
        <h3>{editingId !== null ? `Edit dorm #${editingId}` : 'Add a dorm'}</h3>
        <div className="form-grid">
          <label>Name
            <input name="name" value={form.name} onChange={onChange} required />
          </label>
          <label>Address
            <input name="address" value={form.address} onChange={onChange} required />
          </label>
          <label>Distance to campus (km)
            <input name="distanceToCampusKm" type="number" step="0.1" min="0"
              value={form.distanceToCampusKm} onChange={onChange} required />
          </label>
          <label>Base price
            <input name="basePrice" type="number" step="0.01" min="0"
              value={form.basePrice} onChange={onChange} required />
          </label>
          <label>Overall noise level
            <select name="overallNoiseLevel" value={form.overallNoiseLevel} onChange={onChange}>
              {NOISE_LEVELS.map((n) => <option key={n}>{n}</option>)}
            </select>
          </label>
          <label>Contact email
            <input name="contactEmail" type="email" value={form.contactEmail} onChange={onChange} />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn primary">{editingId !== null ? 'Update' : 'Create'}</button>
          {editingId !== null && <button type="button" className="btn" onClick={reset}>Cancel</button>}
        </div>
      </form>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Address</th><th>Distance (km)</th>
              <th>Base price</th><th>Noise</th><th>Contact</th><th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((d) => (
              <tr key={d.dormId}>
                <td>{d.dormId}</td><td>{d.name}</td><td>{d.address}</td>
                <td>{d.distanceToCampusKm}</td><td>{d.basePrice}</td>
                <td>{d.overallNoiseLevel}</td><td>{d.contactEmail}</td>
                <td className="row-actions">
                  <button className="btn small" onClick={() => onEdit(d)}>Edit</button>
                  <button className="btn small danger" onClick={() => onDelete(d.dormId)}>Delete</button>
                </td>
              </tr>
            ))}
            {!loading && items.length === 0 && (
              <tr><td colSpan="8" className="empty">No dorms yet. Add one above.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
