import { useEffect, useState } from 'react'
import { api, num } from '../api.js'

const STATUSES = ['AVAILABLE', 'OCCUPIED', 'FULL'] // adjust to match your backend enum
const EMPTY = { dormId: '', roomNumber: '', capacity: '', monthlyPrice: '', occupancyStatus: 'AVAILABLE' }

export default function RoomList() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(EMPTY)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      setItems(await api.list('rooms'))
      setError('')
    } catch (e) {
      setError(`Could not load rooms: ${e.message}`)
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
      dorm: { dormId: num(form.dormId) },
      roomNumber: form.roomNumber,
      capacity: num(form.capacity),
      monthlyPrice: num(form.monthlyPrice),
      occupancyStatus: form.occupancyStatus,
    }
    try {
      if (editingId !== null) await api.update('rooms', editingId, { ...body, roomId: editingId })
      else await api.create('rooms', body)
      reset()
      load()
    } catch (err) {
      setError(`Could not save room: ${err.message}`)
    }
  }

  const onEdit = (r) => {
    setEditingId(r.roomId)
    setForm({
      dormId: r.dorm?.dormId ?? '',
      roomNumber: r.roomNumber ?? '',
      capacity: r.capacity ?? '',
      monthlyPrice: r.monthlyPrice ?? '',
      occupancyStatus: r.occupancyStatus ?? 'AVAILABLE',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onDelete = async (id) => {
    if (!window.confirm('Delete this room?')) return
    try {
      await api.remove('rooms', id)
      if (editingId === id) reset()
      load()
    } catch (err) {
      setError(`Could not delete room: ${err.message}`)
    }
  }

  return (
    <section>
      <h2>Rooms</h2>
      {error && <div className="error">{error}</div>}

      <form className="form" onSubmit={onSubmit}>
        <h3>{editingId !== null ? `Edit room #${editingId}` : 'Add a room'}</h3>
        <div className="form-grid">
          <label>Dorm ID
            <input name="dormId" type="number" min="1" value={form.dormId} onChange={onChange} required />
          </label>
          <label>Room number
            <input name="roomNumber" value={form.roomNumber} onChange={onChange} required />
          </label>
          <label>Capacity
            <input name="capacity" type="number" min="1" value={form.capacity} onChange={onChange} required />
          </label>
          <label>Monthly price
            <input name="monthlyPrice" type="number" step="0.01" min="0"
              value={form.monthlyPrice} onChange={onChange} required />
          </label>
          <label>Occupancy status
            <select name="occupancyStatus" value={form.occupancyStatus} onChange={onChange}>
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
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
            <tr><th>ID</th><th>Dorm</th><th>Room</th><th>Capacity</th><th>Monthly price</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {items.map((r) => (
              <tr key={r.roomId}>
                <td>{r.roomId}</td>
                <td>{r.dorm ? `${r.dorm.name ?? 'Dorm'} (#${r.dorm.dormId})` : ''}</td>
                <td>{r.roomNumber}</td><td>{r.capacity}</td><td>{r.monthlyPrice}</td>
                <td>{r.occupancyStatus}</td>
                <td className="row-actions">
                  <button className="btn small" onClick={() => onEdit(r)}>Edit</button>
                  <button className="btn small danger" onClick={() => onDelete(r.roomId)}>Delete</button>
                </td>
              </tr>
            ))}
            {!loading && items.length === 0 && (
              <tr><td colSpan="7" className="empty">No rooms yet. Add one above.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
