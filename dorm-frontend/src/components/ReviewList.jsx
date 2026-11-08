import { useEffect, useState } from 'react'
import { api, num } from '../api.js'

const EMPTY = { studentId: '', dormId: '', noiseRating: '', studyFriendlyRating: '', comment: '' }

export default function ReviewList() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(EMPTY)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      setItems(await api.list('reviews'))
      setError('')
    } catch (e) {
      setError(`Could not load reviews: ${e.message}`)
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
      student: { studentId: num(form.studentId) },
      dorm: { dormId: num(form.dormId) },
      noiseRating: num(form.noiseRating),
      studyFriendlyRating: num(form.studyFriendlyRating),
      comment: form.comment,
    }
    try {
      if (editingId !== null) await api.update('reviews', editingId, { ...body, reviewId: editingId })
      else await api.create('reviews', body)
      reset()
      load()
    } catch (err) {
      setError(`Could not save review: ${err.message}`)
    }
  }

  const onEdit = (r) => {
    setEditingId(r.reviewId)
    setForm({
      studentId: r.student?.studentId ?? '',
      dormId: r.dorm?.dormId ?? '',
      noiseRating: r.noiseRating ?? '',
      studyFriendlyRating: r.studyFriendlyRating ?? '',
      comment: r.comment ?? '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onDelete = async (id) => {
    if (!window.confirm('Delete this review?')) return
    try {
      await api.remove('reviews', id)
      if (editingId === id) reset()
      load()
    } catch (err) {
      setError(`Could not delete review: ${err.message}`)
    }
  }

  return (
    <section>
      <h2>Reviews</h2>
      {error && <div className="error">{error}</div>}

      <form className="form" onSubmit={onSubmit}>
        <h3>{editingId !== null ? `Edit review #${editingId}` : 'Add a review'}</h3>
        <div className="form-grid">
          <label>Student ID
            <input name="studentId" type="number" min="1" value={form.studentId} onChange={onChange} required />
          </label>
          <label>Dorm ID
            <input name="dormId" type="number" min="1" value={form.dormId} onChange={onChange} required />
          </label>
          <label>Noise rating (1-5)
            <input name="noiseRating" type="number" min="1" max="5"
              value={form.noiseRating} onChange={onChange} required />
          </label>
          <label>Study-friendly rating (1-5)
            <input name="studyFriendlyRating" type="number" min="1" max="5"
              value={form.studyFriendlyRating} onChange={onChange} required />
          </label>
          <label className="wide">Comment
            <textarea name="comment" rows="3" value={form.comment} onChange={onChange} />
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
            <tr><th>ID</th><th>Student</th><th>Dorm</th><th>Noise</th><th>Study-friendly</th><th>Comment</th><th></th></tr>
          </thead>
          <tbody>
            {items.map((r) => (
              <tr key={r.reviewId}>
                <td>{r.reviewId}</td>
                <td>{r.student ? `#${r.student.studentId}${r.student.firstName ? ' ' + r.student.firstName : ''}` : ''}</td>
                <td>{r.dorm ? `${r.dorm.name ?? 'Dorm'} (#${r.dorm.dormId})` : ''}</td>
                <td>{r.noiseRating}/5</td><td>{r.studyFriendlyRating}/5</td>
                <td className="comment">{r.comment}</td>
                <td className="row-actions">
                  <button className="btn small" onClick={() => onEdit(r)}>Edit</button>
                  <button className="btn small danger" onClick={() => onDelete(r.reviewId)}>Delete</button>
                </td>
              </tr>
            ))}
            {!loading && items.length === 0 && (
              <tr><td colSpan="7" className="empty">No reviews yet. Add one above.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
