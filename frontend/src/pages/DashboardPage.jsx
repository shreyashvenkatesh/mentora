import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DashboardPage.css';

const API_BASE = 'http://localhost:5000/api/workspace';

const FLASHCARDS = [
  {
    q: 'What are the four necessary conditions for a deadlock?',
    a: 'Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.',
  },
  {
    q: 'When is a relation in Boyce-Codd Normal Form (BCNF)?',
    a: 'When for every non-trivial functional dependency X → Y, X is a superkey.',
  },
  {
    q: 'What is a structural hazard in CPU pipelining?',
    a: 'When two instructions require the same hardware resource during the same clock cycle.',
  },
];

function DashboardPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('mentora_token');
  const savedUser = JSON.parse(localStorage.getItem('mentora_user') || 'null');
  const user = savedUser || { name: 'Student', email: 'student@mentora.app' };

  const [activeSection, setActiveSection] = useState('notes');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Operating Systems');

  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');

  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: 'Ask anything from your uploaded notes. Every answer stays grounded in your syllabus.',
      source: 'Active Workspace Ready',
    },
  ]);

  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Protect route & fetch user's Notes and Tasks from MongoDB
  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch(`${API_BASE}/notes`, { headers }).then((r) => r.json()),
      fetch(`${API_BASE}/tasks`, { headers }).then((r) => r.json()),
    ])
      .then(([notesData, tasksData]) => {
        if (Array.isArray(notesData)) setNotes(notesData);
        if (Array.isArray(tasksData)) setTasks(tasksData);
      })
      .catch((err) => console.error('Workspace load error:', err));
  }, [token, navigate]);

  const subjects = ['All', 'Operating Systems', 'DBMS', 'Computer Architecture'];

  const visibleNotes =
    selectedSubject === 'All'
      ? notes
      : notes.filter((n) => n.subject === selectedSubject);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const res = await fetch(`${API_BASE}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTitle.trim(), subject: newSubject }),
    });

    if (res.ok) {
      const created = await res.json();
      setNotes([created, ...notes]);
      setNewTitle('');
    }
  };

  const handleDeleteNote = async (id) => {
    const res = await fetch(`${API_BASE}/notes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setNotes(notes.filter((n) => n._id !== id));
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const res = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: newTaskText.trim() }),
    });

    if (res.ok) {
      const created = await res.json();
      setTasks([...tasks, created]);
      setNewTaskText('');
    }
  };

  const toggleTask = async (id) => {
    const res = await fetch(`${API_BASE}/tasks/${id}/toggle`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const updated = await res.json();
      setTasks(tasks.map((t) => (t._id === id ? updated : t)));
    }
  };

  const handleAsk = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    const userMsg = { role: 'user', text: question.trim() };
    const aiReply = {
      role: 'ai',
      text: `Based on your ${selectedSubject === 'All' ? 'course' : selectedSubject} notes: break the concept down into its core definition, conditions, and an exam example to score full marks.`,
      source: `Cited from ${visibleNotes[0]?.title || 'Course Notes'}`,
    };
    setMessages([...messages, userMsg, aiReply]);
    setQuestion('');
  };

  const handleLogout = () => {
    localStorage.removeItem('mentora_token');
    localStorage.removeItem('mentora_user');
    navigate('/');
  };

  return (
    <div className="dash-layout">
      {/* LEFT SIDEBAR */}
      <aside className="dash-sidebar">
        <div>
          <Link to="/" className="dash-brand">
            <img src="/logo.png" alt="Mentora" />
            <span>Mentora</span>
          </Link>

          <nav className="dash-nav">
            <button
              type="button"
              className={`dash-nav-btn ${activeSection === 'notes' ? 'active' : ''}`}
              onClick={() => setActiveSection('notes')}
            >
              <span>Notes Library</span>
              <span className="dash-badge">{notes.length}</span>
            </button>

            <button
              type="button"
              className={`dash-nav-btn ${activeSection === 'ask' ? 'active' : ''}`}
              onClick={() => setActiveSection('ask')}
            >
              <span>Ask Notes</span>
            </button>

            <button
              type="button"
              className={`dash-nav-btn ${activeSection === 'flashcards' ? 'active' : ''}`}
              onClick={() => setActiveSection('flashcards')}
            >
              <span>Flashcards</span>
              <span className="dash-badge">{FLASHCARDS.length}</span>
            </button>

            <button
              type="button"
              className={`dash-nav-btn ${activeSection === 'planner' ? 'active' : ''}`}
              onClick={() => setActiveSection('planner')}
            >
              <span>Study Plan</span>
              <span className="dash-badge">{tasks.length}</span>
            </button>
          </nav>
        </div>

        <div className="dash-user-box">
          <div>
            <div className="dash-user-name">{user.name}</div>
            <div className="dash-user-email">{user.email}</div>
          </div>
          <button type="button" className="btn btn-outline" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </aside>

      {/* MAIN WORKSPACE */}
      <main className="dash-main">
        <div className="dash-header">
          <div>
            <h1>Welcome back, {user.name}</h1>
            <p>Pick a subject and continue where you left off.</p>
          </div>
        </div>

        {/* SUBJECT FILTER */}
        <div className="subject-bar">
          {subjects.map((subj) => (
            <button
              key={subj}
              type="button"
              className={`subject-pill ${selectedSubject === subj ? 'active' : ''}`}
              onClick={() => setSelectedSubject(subj)}
            >
              {subj}
            </button>
          ))}
        </div>

        {/* QUICK METRICS */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Saved Materials</div>
            <div className="stat-value">{visibleNotes.length} Docs</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Cards Due Today</div>
            <div className="stat-value">{FLASHCARDS.length} Cards</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Tasks Completed</div>
            <div className="stat-value">
              {tasks.filter((t) => t.done).length} / {tasks.length}
            </div>
          </div>
        </div>

        {/* SECTION 1: NOTES LIBRARY */}
        {activeSection === 'notes' && (
          <section className="panel">
            <h2 className="panel-title">Notes Library</h2>

            <form className="note-form" onSubmit={handleAddNote}>
              <input
                type="text"
                className="form-input"
                placeholder="Add new lecture note title..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <select
                className="form-input"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
              >
                <option value="Operating Systems">Operating Systems</option>
                <option value="DBMS">DBMS</option>
                <option value="Computer Architecture">Computer Architecture</option>
              </select>
              <button type="submit" className="btn btn-accent">
                + Save Note
              </button>
            </form>

            {visibleNotes.length === 0 ? (
              <p className="note-meta">No notes saved yet. Add your first lecture note above.</p>
            ) : (
              <div className="notes-list">
                {visibleNotes.map((note) => (
                  <div key={note._id} className="note-row">
                    <div>
                      <h3>{note.title}</h3>
                      <span className="note-meta">
                        {note.subject} • {note.pages} pages
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => setActiveSection('ask')}
                      >
                        Ask Notes →
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => handleDeleteNote(note._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* SECTION 2: ASK NOTES */}
        {activeSection === 'ask' && (
          <section className="panel">
            <h2 className="panel-title">Ask Your Notes</h2>

            <div className="chat-box">
              {messages.map((msg, idx) => (
                <div key={idx} className={`chat-msg ${msg.role}`}>
                  <div>{msg.text}</div>
                  {msg.source && <span className="chat-cite">✓ {msg.source}</span>}
                </div>
              ))}
            </div>

            <form className="chat-input-row" onSubmit={handleAsk}>
              <input
                type="text"
                className="form-input"
                placeholder="Ask a question about your syllabus..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Ask
              </button>
            </form>
          </section>
        )}

        {/* SECTION 3: FLASHCARDS */}
        {activeSection === 'flashcards' && (
          <section className="panel">
            <h2 className="panel-title">
              SM-2 Flashcards ({cardIndex + 1} of {FLASHCARDS.length})
            </h2>

            <div
              className="flashcard-box"
              onClick={() => setFlipped(!flipped)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setFlipped(!flipped)}
            >
              <div className="flashcard-side">
                {flipped ? 'Answer (Click to flip back)' : 'Question (Click to reveal answer)'}
              </div>
              <div className="flashcard-text">
                {flipped ? FLASHCARDS[cardIndex].a : FLASHCARDS[cardIndex].q}
              </div>
            </div>

            <div className="flashcard-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setFlipped(false);
                  setCardIndex((cardIndex - 1 + FLASHCARDS.length) % FLASHCARDS.length);
                }}
              >
                ← Previous
              </button>
              <button
                type="button"
                className="btn btn-accent"
                onClick={() => {
                  setFlipped(false);
                  setCardIndex((cardIndex + 1) % FLASHCARDS.length);
                }}
              >
                Next Card →
              </button>
            </div>
          </section>
        )}

        {/* SECTION 4: STUDY PLAN */}
        {activeSection === 'planner' && (
          <section className="panel">
            <h2 className="panel-title">Today&apos;s Study Checklist</h2>

            <form className="chat-input-row" style={{ marginBottom: '1rem' }} onSubmit={handleAddTask}>
              <input
                type="text"
                className="form-input"
                placeholder="Add a study task for today..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
              />
              <button type="submit" className="btn btn-accent">
                + Add Task
              </button>
            </form>

            {tasks.length === 0 ? (
              <p className="note-meta">No tasks yet. Add your first study goal above.</p>
            ) : (
              tasks.map((task) => (
                <label
                  key={task._id}
                  className={`task-row ${task.done ? 'done' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task._id)}
                  />
                  <span>{task.text}</span>
                </label>
              ))
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default DashboardPage;