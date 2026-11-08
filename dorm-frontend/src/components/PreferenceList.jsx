import { useEffect, useState } from 'react'
import { api, num } from '../api.js'

const NOISE_LEVELS = ['SILENT', 'QUIET', 'MODERATE', 'LOUD'] // adjust to match your backend enum
const EMPTY = {
  studentId: '', styleId: '', preferredNoiseLevel: 'QUIET', needsSharedStudySpace: false,
  studyStartHour: '', studyEndHour: '', budgetMax: '', maxDistanceKm: '',
}

export default function PreferenceList() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(EMPTY)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      setItems(await api.list('studentpreferences'))
      setError('')
    } catch (e) {
      setError(`Could not load preferences: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { load() }, [])

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }
  const reset = () => { setForm(EMPTY); setEditingId(null) }

  const onSubmit = async (e) => {
    e.preventDefault()
    const body = {
      student: { studentId: num(form.studentId) },
      style: { styleId: num(form.styleId) },
      preferredNoiseLevel: form.preferredNoiseLevel,
      needsSharedStudySpace: form.needsSharedStudySpace,
      studyStartHour: num(form.studyStartHour),
      studyEndHour: num(form.studyEndHour),
      budgetMax: num(form.budgetMax),
      maxDistanceKm: num(form.maxDistanceKm),
    }
    try {
      if (editingId !== null) await api.update('studentpreferences', editingId, { ...body, prefId: editingId })
      else await api.create('studentpreferences', body)
      reset()
      load()
    } catch (err) {
      setError(`Could not save preference: ${err.message}`)
    }
  }

  const onEdit = (p) => {
    setEditingId(p.prefId)
    setForm({
      studentId: p.student?.studentId ?? '',
      styleId: p.style?.styleId ?? '',
      preferredNoiseLevel: p.preferredNoiseLevel ?? 'QUIET',
      needsSharedStudySpace: !!p.needsSharedStudySpace,
      studyStartHour: p.studyStartHour ?? '',
      studyEndHour: p.studyEndHour ?? '',
      budgetMax: p.budgetMax ?? '',
      maxDistanceKm: p.maxDistanceKm ?? '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onDelete = async (id) => {
    if (!window.confirm('Delete this preference?')) return
    try {
      await api.remove('studentpreferences', id)
      if (editingId === id) reset()
      load()
    } catch (err) {
      setError(`Could not delete preference: ${err.message}`)
    }
  }

  return (
    <section>
      <h2>Student preferences</h2>
      {error && <div className="error">{error}</div>}

      <form className="form" onSubmit={onSubmit}>
        <h3>{editingId !== null ? `Edit preference #${editingId}` : 'Add a preference'}</h3>
        <div className="form-grid">
          <label>Student ID
            <input name="studentId" type="number" min="1" value={form.studentId} onChange={onChange} required />
          </label>
          <label>Learning style ID
            <input name="styleId" type="number" min="1" value={form.styleId} onChange={onChange} required />
          </label>
          <label>Preferred noise level
            <select name="preferredNoiseLevel" value={form.preferredNoiseLevel} onChange={onChange}>
              {NOISE_LEVELS.map((n) => <option key={n}>{n}</option>)}
            </select>
          </label>
          <label>Study start hour (0-24)
            <input name="studyStartHour" type="number" min="0" max="24"
              value={form.studyStartHour} onChange={onChange} />
          </label>
          <label>Study end hour (0-24)
            <input name="studyEndHour" type="number" min="0" max="24"
              value={form.studyEndHour} onChange={onChange} />
          </label>
          <label>Maximum budget
            <input name="budgetMax" type="number" step="0.01" min="0"
              value={form.budgetMax} onChange={onChange} />
          </label>
          <label>Maximum distance (km)
            <input name="maxDistanceKm" type="number" step="0.1" min="0"
              value={form.maxDistanceKm} onChange={onChange} />
          </label>
          <label className="checkbox">
            <input name="needsSharedStudySpace" type="checkbox"
              checked={form.needsSharedStudySpace} onChange={onChange} />
            Needs shared study space
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
              <th>ID</th><th>Student</th><th>Style</th><th>Noise</th><th>Shared space</th>
              <th>Study hours</th><th>Max budget</th><th>Max km</th><th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.prefId}>
                <td>{p.prefId}</td>
                <td>{p.student ? `#${p.student.studentId}${p.student.firstName ? ' ' + p.student.firstName : ''}` : ''}</td>
                <td>{p.style ? `${p.style.styleName ?? 'Style'} (#${p.style.styleId})` : ''}</td>
                <td>{p.preferredNoiseLevel}</td>
                <td>{p.needsSharedStudySpace ? 'Yes' : 'No'}</td>
                <td>{p.studyStartHour}:00 – {p.studyEndHour}:00</td>
                <td>{p.budgetMax}</td><td>{p.maxDistanceKm}</td>
                <td className="row-actions">
                  <button className="btn small" onClick={() => onEdit(p)}>Edit</button>
                  <button className="btn small danger" onClick={() => onDelete(p.prefId)}>Delete</button>
                </td>
              </tr>
            ))}
            {!loading && items.length === 0 && (
              <tr><td colSpan="9" className="empty">No preferences yet. Add one above.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
