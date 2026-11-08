import { useEffect, useState } from 'react'
import { api, num } from '../api.js'

const EMPTY = { firstName: '', lastName: '', email: '', yearLevel: '' }

export default function StudentList() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(EMPTY)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      setItems(await api.list('students'))
      setError('')
    } catch (e) {
      setError(`Could not load students: ${e.message}`)
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
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      yearLevel: num(form.yearLevel),
    }
    try {
      if (editingId !== null) await api.update('students', editingId, { ...body, studentId: editingId })
      else await api.create('students', body)
      reset()
      load()
    } catch (err) {
      setError(`Could not save student: ${err.message}`)
    }
  }

  const onEdit = (s) => {
    setEditingId(s.studentId)
    setForm({
      firstName: s.firstName ?? '', lastName: s.lastName ?? '',
      email: s.email ?? '', yearLevel: s.yearLevel ?? '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return
    try {
      await api.remove('students', id)
      if (editingId === id) reset()
      load()
    } catch (err) {
      setError(`Could not delete student: ${err.message}`)
    }
  }

  return (
    <section>
      <h2>Students</h2>
      {error && <div className="error">{error}</div>}

      <form className="form" onSubmit={onSubmit}>
        <h3>{editingId !== null ? `Edit student #${editingId}` : 'Add a student'}</h3>
        <div className="form-grid">
          <label>First name
            <input name="firstName" value={form.firstName} onChange={onChange} required />
          </label>
          <label>Last name
            <input name="lastName" value={form.lastName} onChange={onChange} required />
          </label>
          <label>Email
            <input name="email" type="email" value={form.email} onChange={onChange} required />
          </label>
          <label>Year level
            <input name="yearLevel" type="number" min="1" max="8"
              value={form.yearLevel} onChange={onChange} required />
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
            <tr><th>ID</th><th>First name</th><th>Last name</th><th>Email</th><th>Year</th><th></th></tr>
          </thead>
          <tbody>
            {items.map((s) => (
              <tr key={s.studentId}>
                <td>{s.studentId}</td><td>{s.firstName}</td><td>{s.lastName}</td>
                <td>{s.email}</td><td>{s.yearLevel}</td>
                <td className="row-actions">
                  <button className="btn small" onClick={() => onEdit(s)}>Edit</button>
                  <button className="btn small danger" onClick={() => onDelete(s.studentId)}>Delete</button>
                </td>
              </tr>
            ))}
            {!loading && items.length === 0 && (
              <tr><td colSpan="6" className="empty">No students yet. Add one above.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
