import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './LandingPage.css';

const TOOLS = [
  {
    title: 'Notes Library',
    desc: 'Upload PDFs & DOCX files, organize by subject, and search every page.',
  },
  {
    title: 'Exam Summarizer',
    desc: 'Condense long chapters into key definitions and revision sheets.',
  },
  {
    title: 'Cited Study Chat',
    desc: 'Ask questions and get answers backed directly by your own notes.',
  },
  {
    title: 'Practice Quizzes',
    desc: 'Generate MCQs, fill-in-the-blanks, and short tests from any topic.',
  },
  {
    title: 'SM-2 Flashcards',
    desc: 'Review cards right before you forget using spaced repetition.',
  },
  {
    title: 'Study Planner',
    desc: 'Split syllabus topics across your exam dates and track weak areas.',
  },
];

function LandingPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('summary');

  return (
    <div id="top">
      <Navbar onNavigate={onNavigate} />

      {/* HERO + INTERACTIVE WORKSPACE */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="hero-tag">Student Study Workspace</span>
            <h1 className="hero-title">
              Turn your lecture notes into exam readiness.
            </h1>
            <p className="hero-subtitle">
              Upload your PDFs and notes. Get cited answers, concise summaries,
              practice quizzes, and spaced-repetition flashcards in one place.
            </p>

            <div className="hero-cta-group">
              <button
                type="button"
                className="btn btn-accent btn-lg"
                onClick={() => onNavigate('register')}
              >
                Create Free Account
              </button>
              <a href="#features" className="btn btn-outline btn-lg">
                See Tools
              </a>
            </div>
          </div>

          {/* INTERACTIVE PREVIEW */}
          <div className="workspace-card">
            <div className="workspace-topbar">
              <span>📄 Operating_Systems_Unit2.pdf</span>
              <span>32 pages</span>
            </div>

            <div className="workspace-tabs">
              <button
                type="button"
                className={`workspace-tab ${activeTab === 'summary' ? 'active' : ''}`}
                onClick={() => setActiveTab('summary')}
              >
                Summary
              </button>
              <button
                type="button"
                className={`workspace-tab ${activeTab === 'ask' ? 'active' : ''}`}
                onClick={() => setActiveTab('ask')}
              >
                Ask Notes
              </button>
              <button
                type="button"
                className={`workspace-tab ${activeTab === 'quiz' ? 'active' : ''}`}
                onClick={() => setActiveTab('quiz')}
              >
                Quick Check
              </button>
            </div>

            <div className="workspace-body">
              {activeTab === 'summary' && (
                <div className="workspace-content">
                  <h4>Key Takeaways — Deadlock Conditions</h4>
                  <ul className="workspace-list">
                    <li>Mutual Exclusion: At least one resource is non-shareable.</li>
                    <li>Hold & Wait: Process holds resources while waiting for more.</li>
                    <li>No Preemption & Circular Wait must occur simultaneously.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'ask' && (
                <div className="workspace-content">
                  <h4>Q: How does Banker&apos;s Algorithm prevent deadlock?</h4>
                  <p>
                    It checks whether allocating requested resources leaves the
                    system in a safe state before granting them, avoiding unsafe
                    allocation paths.
                  </p>
                </div>
              )}

              {activeTab === 'quiz' && (
                <div className="workspace-content">
                  <h4>Practice Question (1 of 5)</h4>
                  <p>
                    Which condition is broken when a system forces a process to
                    release held resources? <strong>Answer: No Preemption.</strong>
                  </p>
                </div>
              )}

              <div className="workspace-source">
                <span className="source-tag">✓ Grounded in uploaded PDF</span>
                <span>Page 11–14</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE TOOLS */}
      <section id="features" className="section">
        <div className="container">
          <div className="section-header">
            <h2>Built for actual studying</h2>
            <p>Six focused tools. Zero clutter.</p>
          </div>

          <div className="tools-grid">
            {TOOLS.map((tool) => (
              <div key={tool.title} className="tool-card">
                <div className="tool-title">
                  <span className="tool-dot"></span>
                  <span>{tool.title}</span>
                </div>
                <p>{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="workflow" className="section">
        <div className="container">
          <div className="section-header">
            <h2>How it works</h2>
          </div>

          <div className="workflow-strip">
            <div className="workflow-item">
              <span className="workflow-num">1</span>
              <div>
                <h3>Add your syllabus</h3>
                <p>Drop in PDFs, DOCX files, or typed class notes by subject.</p>
              </div>
            </div>

            <div className="workflow-item">
              <span className="workflow-num">2</span>
              <div>
                <h3>Clarify tough topics</h3>
                <p>Generate revision notes or ask questions cited from your files.</p>
              </div>
            </div>

            <div className="workflow-item">
              <span className="workflow-num">3</span>
              <div>
                <h3>Test yourself</h3>
                <p>Drill flashcards and mock quizzes before exam day.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section id="modules" className="section">
        <div className="container">
          <div className="cta-strip">
            <div>
              <h2>Start organizing your semester</h2>
              <p>Free for students. Set up your subjects in under a minute.</p>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => onNavigate('register')}
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-inner">
          <span>
            <strong>Mentora</strong> — Learn smarter. Understand deeper. Grow further.
          </span>
          <span>© 2026 Mentora</span>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;