import { useState, useRef, useEffect } from "react";

// ── COLOR PALETTE (from PPT) ─────────────────────────────────────
// Black bg: #000000 | Off-white: #FBF9F1 / #E5E1DA
// Purple accent: #8064A2 / #800080 | Yellow highlight: #FFD944

const COLORS = {
  bg: "#0a0a0f",
  surface: "#13131a",
  surfaceAlt: "#1a1a24",
  border: "#2a2a3a",
  purple: "#8064A2",
  purpleLight: "#a080d0",
  purpleDark: "#5a4470",
  yellow: "#FFD944",
  offWhite: "#FBF9F1",
  muted: "#E5E1DA",
  mutedDark: "#9994a0",
  red: "#e05c7a",
  green: "#6ed8a4",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  * { margin:0; padding:0; box-sizing:border-box; }

  body, #root {
    background: ${COLORS.bg};
    color: ${COLORS.offWhite};
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${COLORS.surface}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.purpleDark}; border-radius: 4px; }

  .app-shell {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  /* SIDEBAR */
  .sidebar {
    width: 240px;
    min-width: 240px;
    background: ${COLORS.surface};
    border-right: 1px solid ${COLORS.border};
    display: flex;
    flex-direction: column;
    padding: 0;
    overflow-y: auto;
  }

  .sidebar-logo {
    padding: 24px 20px 20px;
    border-bottom: 1px solid ${COLORS.border};
  }

  .logo-title {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 15px;
    letter-spacing: 0.08em;
    color: ${COLORS.offWhite};
    line-height: 1.2;
  }

  .logo-sub {
    font-size: 10px;
    color: ${COLORS.mutedDark};
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-top: 3px;
  }

  .logo-badge {
    display: inline-block;
    background: ${COLORS.purpleDark};
    color: ${COLORS.purpleLight};
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.1em;
    padding: 2px 7px;
    border-radius: 20px;
    margin-top: 8px;
    text-transform: uppercase;
  }

  .sidebar-section {
    padding: 16px 12px 8px;
  }

  .sidebar-section-label {
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${COLORS.mutedDark};
    padding: 0 8px;
    margin-bottom: 6px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 13.5px;
    color: ${COLORS.mutedDark};
    transition: all 0.15s;
    margin-bottom: 2px;
    font-weight: 400;
    border: 1px solid transparent;
  }

  .nav-item:hover {
    background: ${COLORS.surfaceAlt};
    color: ${COLORS.offWhite};
  }

  .nav-item.active {
    background: linear-gradient(135deg, ${COLORS.purpleDark}55, ${COLORS.purpleDark}22);
    color: ${COLORS.purpleLight};
    border-color: ${COLORS.purpleDark}66;
    font-weight: 500;
  }

  .nav-icon { font-size: 15px; width: 18px; text-align: center; }

  /* MAIN CONTENT */
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .topbar {
    padding: 16px 28px;
    border-bottom: 1px solid ${COLORS.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${COLORS.surface};
    flex-shrink: 0;
  }

  .page-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 18px;
    letter-spacing: 0.02em;
  }

  .role-badge {
    display: flex;
    gap: 6px;
  }

  .badge {
    font-size: 11px;
    padding: 4px 12px;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.15s;
    border: 1px solid ${COLORS.border};
    color: ${COLORS.mutedDark};
    background: transparent;
  }

  .badge.active {
    background: ${COLORS.purple};
    color: white;
    border-color: ${COLORS.purple};
  }

  .content-area {
    flex: 1;
    overflow-y: auto;
    padding: 28px;
  }

  /* CARDS */
  .card {
    background: ${COLORS.surface};
    border: 1px solid ${COLORS.border};
    border-radius: 14px;
    padding: 20px;
  }

  .card-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.04em;
    margin-bottom: 16px;
    color: ${COLORS.offWhite};
    text-transform: uppercase;
  }

  /* GRID */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
  .grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }

  /* STAT CARDS */
  .stat-card {
    background: ${COLORS.surface};
    border: 1px solid ${COLORS.border};
    border-radius: 12px;
    padding: 18px;
    position: relative;
    overflow: hidden;
  }

  .stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, ${COLORS.purple}, ${COLORS.purpleLight});
  }

  .stat-label { font-size: 11px; color: ${COLORS.mutedDark}; text-transform: uppercase; letter-spacing: 0.1em; }
  .stat-value { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; margin: 6px 0 2px; }
  .stat-sub { font-size: 12px; color: ${COLORS.mutedDark}; }

  /* CHAT */
  .chat-container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 120px);
  }

  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .msg {
    display: flex;
    gap: 12px;
    max-width: 80%;
    animation: fadeUp 0.25s ease;
  }

  .msg.user { align-self: flex-end; flex-direction: row-reverse; }

  .msg-avatar {
    width: 32px; height: 32px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
  }

  .msg.ai .msg-avatar { background: ${COLORS.purpleDark}; }
  .msg.user .msg-avatar { background: ${COLORS.surfaceAlt}; border: 1px solid ${COLORS.border}; }

  .msg-bubble {
    padding: 12px 16px;
    border-radius: 14px;
    font-size: 14px;
    line-height: 1.6;
  }

  .msg.ai .msg-bubble {
    background: ${COLORS.surfaceAlt};
    border: 1px solid ${COLORS.border};
    border-top-left-radius: 4px;
    color: ${COLORS.offWhite};
  }

  .msg.user .msg-bubble {
    background: ${COLORS.purple};
    border-top-right-radius: 4px;
    color: white;
  }

  .chat-input-row {
    display: flex;
    gap: 10px;
    padding: 16px 0 0;
    border-top: 1px solid ${COLORS.border};
  }

  .chat-input {
    flex: 1;
    background: ${COLORS.surfaceAlt};
    border: 1px solid ${COLORS.border};
    border-radius: 10px;
    padding: 12px 16px;
    color: ${COLORS.offWhite};
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    resize: none;
    transition: border-color 0.15s;
  }

  .chat-input:focus { border-color: ${COLORS.purple}; }
  .chat-input::placeholder { color: ${COLORS.mutedDark}; }

  /* BUTTONS */
  .btn {
    padding: 10px 20px;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: all 0.15s;
    display: flex; align-items: center; gap: 6px;
  }

  .btn-primary {
    background: ${COLORS.purple};
    color: white;
  }
  .btn-primary:hover { background: ${COLORS.purpleLight}; }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

  .btn-ghost {
    background: transparent;
    border: 1px solid ${COLORS.border};
    color: ${COLORS.muted};
  }
  .btn-ghost:hover { border-color: ${COLORS.purple}; color: ${COLORS.purpleLight}; }

  /* SWOT */
  .swot-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  .swot-card {
    border-radius: 12px;
    padding: 16px;
    border: 1px solid;
  }

  .swot-S { background: ${COLORS.green}15; border-color: ${COLORS.green}44; }
  .swot-W { background: ${COLORS.red}15; border-color: ${COLORS.red}44; }
  .swot-O { background: ${COLORS.yellow}15; border-color: ${COLORS.yellow}44; }
  .swot-T { background: ${COLORS.purple}22; border-color: ${COLORS.purple}55; }

  .swot-label {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 22px;
    margin-bottom: 8px;
  }

  .swot-S .swot-label { color: ${COLORS.green}; }
  .swot-W .swot-label { color: ${COLORS.red}; }
  .swot-O .swot-label { color: ${COLORS.yellow}; }
  .swot-T .swot-label { color: ${COLORS.purpleLight}; }

  .swot-title { font-weight: 600; font-size: 13px; margin-bottom: 8px; color: ${COLORS.offWhite}; }
  .swot-items { font-size: 12.5px; color: ${COLORS.muted}; line-height: 1.7; }

  /* QUIZ */
  .quiz-option {
    padding: 12px 16px;
    border-radius: 10px;
    border: 1px solid ${COLORS.border};
    cursor: pointer;
    font-size: 14px;
    transition: all 0.15s;
    margin-bottom: 8px;
    color: ${COLORS.muted};
  }

  .quiz-option:hover { border-color: ${COLORS.purple}; color: ${COLORS.offWhite}; background: ${COLORS.surfaceAlt}; }
  .quiz-option.correct { border-color: ${COLORS.green}; background: ${COLORS.green}15; color: ${COLORS.green}; }
  .quiz-option.wrong { border-color: ${COLORS.red}; background: ${COLORS.red}15; color: ${COLORS.red}; }
  .quiz-option.selected { border-color: ${COLORS.purple}; background: ${COLORS.purple}22; color: ${COLORS.purpleLight}; }

  /* PROGRESS BAR */
  .progress-bar {
    height: 6px;
    background: ${COLORS.surfaceAlt};
    border-radius: 10px;
    overflow: hidden;
    margin-top: 6px;
  }

  .progress-fill {
    height: 100%;
    border-radius: 10px;
    background: linear-gradient(90deg, ${COLORS.purpleDark}, ${COLORS.purpleLight});
    transition: width 0.4s ease;
  }

  /* LOADING SPINNER */
  .spinner {
    width: 16px; height: 16px;
    border: 2px solid ${COLORS.purpleDark};
    border-top-color: ${COLORS.purpleLight};
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    display: inline-block;
  }

  /* TYPING DOTS */
  .typing { display: flex; gap: 4px; align-items: center; padding: 4px 0; }
  .typing span {
    width: 7px; height: 7px;
    background: ${COLORS.purple};
    border-radius: 50%;
    animation: bounce 1s infinite;
  }
  .typing span:nth-child(2) { animation-delay: 0.15s; }
  .typing span:nth-child(3) { animation-delay: 0.3s; }

  /* TABS */
  .tabs { display: flex; gap: 4px; margin-bottom: 20px; }
  .tab {
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 13px;
    color: ${COLORS.mutedDark};
    border: 1px solid transparent;
    transition: all 0.15s;
    font-family: 'DM Sans', sans-serif;
  }
  .tab:hover { color: ${COLORS.offWhite}; background: ${COLORS.surfaceAlt}; }
  .tab.active { background: ${COLORS.purple}; color: white; }

  /* INPUT / SELECT */
  .input, .select {
    background: ${COLORS.surfaceAlt};
    border: 1px solid ${COLORS.border};
    border-radius: 8px;
    padding: 10px 14px;
    color: ${COLORS.offWhite};
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    width: 100%;
    transition: border-color 0.15s;
  }
  .input:focus, .select:focus { border-color: ${COLORS.purple}; }
  .input::placeholder { color: ${COLORS.mutedDark}; }
  .select option { background: ${COLORS.surface}; }

  /* LABEL */
  .label { font-size: 12px; color: ${COLORS.mutedDark}; margin-bottom: 6px; letter-spacing: 0.06em; text-transform: uppercase; }

  /* CHIP */
  .chip {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 500;
  }
  .chip-purple { background: ${COLORS.purpleDark}44; color: ${COLORS.purpleLight}; }
  .chip-yellow { background: ${COLORS.yellow}22; color: ${COLORS.yellow}; }
  .chip-green { background: ${COLORS.green}22; color: ${COLORS.green}; }
  .chip-red { background: ${COLORS.red}22; color: ${COLORS.red}; }

  /* DISCUSSION POSTS */
  .post {
    background: ${COLORS.surfaceAlt};
    border: 1px solid ${COLORS.border};
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 12px;
  }

  .post-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px; }
  .post-author { font-weight: 600; font-size: 13px; color: ${COLORS.purpleLight}; }
  .post-time { font-size: 11px; color: ${COLORS.mutedDark}; }
  .post-body { font-size: 14px; color: ${COLORS.muted}; line-height: 1.6; }

  .ai-reply {
    margin-top: 12px;
    padding: 12px;
    background: ${COLORS.purpleDark}22;
    border-left: 2px solid ${COLORS.purple};
    border-radius: 0 8px 8px 0;
    font-size: 13px;
    color: ${COLORS.muted};
    line-height: 1.6;
  }

  /* NOTES */
  .note-card {
    background: ${COLORS.surfaceAlt};
    border: 1px solid ${COLORS.border};
    border-radius: 12px;
    padding: 16px;
    cursor: pointer;
    transition: border-color 0.15s;
    margin-bottom: 10px;
  }
  .note-card:hover { border-color: ${COLORS.purple}; }
  .note-title { font-weight: 600; font-size: 14px; margin-bottom: 4px; }
  .note-meta { font-size: 11px; color: ${COLORS.mutedDark}; }

  /* MARKS */
  .marks-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid ${COLORS.border};
    font-size: 14px;
  }
  .marks-row:last-child { border-bottom: none; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
    40% { transform: scale(1); opacity: 1; }
  }

  .section-gap { margin-bottom: 20px; }
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .gap-8 { gap: 8px; }
  .gap-12 { gap: 12px; }
  .gap-16 { gap: 16px; }
  .mt-8 { margin-top: 8px; }
  .mt-12 { margin-top: 12px; }
  .mt-16 { margin-top: 16px; }
  .mb-8 { margin-bottom: 8px; }
  .mb-12 { margin-bottom: 12px; }
  .text-muted { color: ${COLORS.mutedDark}; font-size: 13px; }
  .text-sm { font-size: 12px; }
  .full-width { width: 100%; }
`;

// ── API CALL ─────────────────────────────────────────────────────
async function callClaude(messages, systemPrompt = "") {
  const body = {
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    system: systemPrompt || "You are an intelligent academic assistant for 'Survive the Semester', a student learning platform at VIT Vellore. Be concise, helpful, and encouraging.",
    messages,
  };
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data.content?.map(b => b.text || "").join("") || "Sorry, I couldn't generate a response.";
}

// ── NAV CONFIG ────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "◈", section: "Overview" },
  { id: "quiz", label: "Quizzes & PYQ", icon: "⊞", section: "Practice" },
  { id: "swot", label: "SWOT Analysis", icon: "◑", section: "Practice" },
  { id: "doubt", label: "Doubt Window", icon: "⌘", section: "Connect" },
  { id: "discussion", label: "Discussion", icon: "⊡", section: "Connect" },
  { id: "notes", label: "Notes", icon: "⊟", section: "Resources" },
  { id: "marks", label: "Marks & Review", icon: "◎", section: "Resources" },
  { id: "assignments", label: "Assignments", icon: "⊕", section: "Resources" },
];

// ── DASHBOARD ─────────────────────────────────────────────────────
function Dashboard({ role }) {
  return (
    <div>
      <div className="grid-4 section-gap">
        {[
          { label: "Tests Taken", value: "12", sub: "+3 this week", color: COLORS.purple },
          { label: "Avg Score", value: "74%", sub: "↑ 6% from last", color: COLORS.yellow },
          { label: "Weak Chapters", value: "4", sub: "Need focus", color: COLORS.red },
          { label: "Strong Topics", value: "9", sub: "Keep it up!", color: COLORS.green },
        ].map(s => (
          <div className="stat-card" key={s.label}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-2 section-gap">
        <div className="card">
          <div className="card-title">Chapter Progress</div>
          {[
            { name: "Data Structures", pct: 82 },
            { name: "Algorithms", pct: 60 },
            { name: "DBMS", pct: 45 },
            { name: "Operating Systems", pct: 71 },
            { name: "Networks", pct: 38 },
          ].map(c => (
            <div key={c.name} style={{ marginBottom: 14 }}>
              <div className="flex justify-between" style={{ marginBottom: 5 }}>
                <span style={{ fontSize: 13, color: COLORS.muted }}>{c.name}</span>
                <span style={{ fontSize: 12, color: c.pct > 60 ? COLORS.green : c.pct > 40 ? COLORS.yellow : COLORS.red, fontWeight: 600 }}>{c.pct}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${c.pct}%`, background: c.pct > 60 ? `linear-gradient(90deg, ${COLORS.purpleDark}, ${COLORS.green})` : c.pct > 40 ? `linear-gradient(90deg, ${COLORS.purpleDark}, ${COLORS.yellow})` : `linear-gradient(90deg, ${COLORS.purpleDark}, ${COLORS.red})` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-title">Recent Activity</div>
          {[
            { action: "Completed Quiz", detail: "Data Structures — PYQ 2023", time: "2h ago", chip: "chip-purple" },
            { action: "Viewed Notes", detail: "DBMS — Normalization", time: "Yesterday", chip: "chip-yellow" },
            { action: "Submitted Assignment", detail: "OS — Process Scheduling", time: "2 days ago", chip: "chip-green" },
            { action: "SWOT Analysis", detail: "Generated for Networks", time: "3 days ago", chip: "chip-red" },
            { action: "Discussion Post", detail: "Asked about B-Trees", time: "4 days ago", chip: "chip-purple" },
          ].map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "start" }}>
              <div style={{ width: 36, height: 36, background: COLORS.surfaceAlt, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0, border: `1px solid ${COLORS.border}` }}>📌</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.offWhite }}>{a.action}</div>
                <div style={{ fontSize: 12, color: COLORS.mutedDark }}>{a.detail}</div>
              </div>
              <div><span className={`chip ${a.chip}`}>{a.time}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── QUIZ ──────────────────────────────────────────────────────────
function QuizPage() {
  const [topic, setTopic] = useState("Data Structures");
  const [difficulty, setDifficulty] = useState("Medium");
  const [questions, setQuestions] = useState(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const generateQuiz = async () => {
    setLoading(true);
    setQuestions(null); setSelected(null); setCurrent(0); setScore(0); setDone(false); setFeedback("");
    try {
      const prompt = `Generate a 5-question multiple choice quiz on "${topic}" at ${difficulty} difficulty level for a B.Tech CS student. 
Return ONLY valid JSON, no markdown, no explanation:
{"questions":[{"q":"question text","options":["A","B","C","D"],"answer":0,"explanation":"brief explanation"}]}
Answer index is 0-based.`;
      const raw = await callClaude([{ role: "user", content: prompt }], "You are a quiz generator. Return only JSON.");
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setQuestions(parsed.questions);
    } catch (e) {
      alert("Failed to generate quiz. Please try again.");
    }
    setLoading(false);
  };

  const handleAnswer = async (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const q = questions[current];
    const correct = idx === q.answer;
    if (correct) setScore(s => s + 1);
    setFeedback(q.explanation);
  };

  const next = () => {
    if (current + 1 >= questions.length) { setDone(true); return; }
    setCurrent(c => c + 1);
    setSelected(null);
    setFeedback("");
  };

  return (
    <div>
      <div className="card section-gap">
        <div className="card-title">Generate Quiz / PYQ Practice</div>
        <div className="grid-3 gap-12" style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 12, alignItems: "end" }}>
          <div>
            <div className="label">Topic / Chapter</div>
            <select className="select" value={topic} onChange={e => setTopic(e.target.value)}>
              {["Data Structures", "Algorithms", "DBMS", "Operating Systems", "Computer Networks", "OOP", "Theory of Computation"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <div className="label">Difficulty</div>
            <select className="select" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
              <option>Easy</option><option>Medium</option><option>Hard</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={generateQuiz} disabled={loading} style={{ height: 42 }}>
            {loading ? <><span className="spinner" /> Generating…</> : "⊞ Generate Quiz"}
          </button>
        </div>
      </div>

      {questions && !done && (
        <div className="card">
          <div className="flex justify-between items-center mb-12">
            <div style={{ fontSize: 13, color: COLORS.mutedDark }}>
              Question <strong style={{ color: COLORS.offWhite }}>{current + 1}</strong> of {questions.length}
            </div>
            <span className="chip chip-purple">Score: {score}/{current + (selected !== null ? 1 : 0)}</span>
          </div>
          <div className="progress-bar mb-12" style={{ marginBottom: 20 }}>
            <div className="progress-fill" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
          </div>
          <div style={{ fontSize: 16, fontWeight: 500, color: COLORS.offWhite, marginBottom: 20, lineHeight: 1.6 }}>
            {questions[current].q}
          </div>
          {questions[current].options.map((opt, idx) => (
            <div
              key={idx}
              className={`quiz-option ${selected === null ? "" : idx === questions[current].answer ? "correct" : selected === idx ? "wrong" : ""}`}
              onClick={() => handleAnswer(idx)}
            >
              <strong style={{ marginRight: 8 }}>{String.fromCharCode(65 + idx)}.</strong> {opt}
            </div>
          ))}
          {feedback && (
            <div style={{ marginTop: 12, padding: "12px 16px", background: COLORS.surfaceAlt, borderRadius: 10, fontSize: 13, color: COLORS.muted, borderLeft: `3px solid ${COLORS.purple}` }}>
              💡 {feedback}
            </div>
          )}
          {selected !== null && (
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={next}>
              {current + 1 >= questions.length ? "See Results" : "Next →"}
            </button>
          )}
        </div>
      )}

      {done && (
        <div className="card" style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{score >= 4 ? "🏆" : score >= 2 ? "📈" : "📚"}</div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: score >= 4 ? COLORS.green : score >= 2 ? COLORS.yellow : COLORS.red }}>
            {score} / {questions.length}
          </div>
          <div style={{ color: COLORS.mutedDark, marginTop: 8, marginBottom: 20 }}>
            {score >= 4 ? "Excellent work! 🎉" : score >= 2 ? "Good effort, keep practicing!" : "Review the chapter and try again."}
          </div>
          <button className="btn btn-primary" onClick={generateQuiz}>Retry New Quiz</button>
        </div>
      )}
    </div>
  );
}

// ── SWOT ──────────────────────────────────────────────────────────
function SwotPage() {
  const [subject, setSubject] = useState("Computer Science");
  const [scores, setScores] = useState({ ds: 82, algo: 55, dbms: 45, os: 70, cn: 38 });
  const [swot, setSwot] = useState(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const prompt = `A CS student has these chapter scores:
Data Structures: ${scores.ds}%, Algorithms: ${scores.algo}%, DBMS: ${scores.dbms}%, Operating Systems: ${scores.os}%, Computer Networks: ${scores.cn}%

Generate a SWOT analysis for their exam preparation. Return ONLY valid JSON:
{"S":{"title":"Strengths","items":["item1","item2","item3"]},"W":{"title":"Weaknesses","items":["item1","item2","item3"]},"O":{"title":"Opportunities","items":["item1","item2","item3"]},"T":{"title":"Threats","items":["item1","item2","item3"]}}`;
    try {
      const raw = await callClaude([{ role: "user", content: prompt }], "Generate SWOT analysis as JSON only.");
      const clean = raw.replace(/```json|```/g, "").trim();
      setSwot(JSON.parse(clean));
    } catch (e) {
      alert("Failed to generate SWOT. Try again.");
    }
    setLoading(false);
  };

  const chaps = [
    { key: "ds", label: "Data Structures" },
    { key: "algo", label: "Algorithms" },
    { key: "dbms", label: "DBMS" },
    { key: "os", label: "Operating Systems" },
    { key: "cn", label: "Computer Networks" },
  ];

  return (
    <div>
      <div className="card section-gap">
        <div className="card-title">Chapter Score Input</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14, marginBottom: 16 }}>
          {chaps.map(c => (
            <div key={c.key}>
              <div className="label">{c.label}</div>
              <input
                type="number" min={0} max={100}
                className="input"
                value={scores[c.key]}
                onChange={e => setScores(s => ({ ...s, [c.key]: parseInt(e.target.value) || 0 }))}
              />
              <div className="progress-bar mt-8">
                <div className="progress-fill" style={{ width: `${scores[c.key]}%` }} />
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary" onClick={generate} disabled={loading}>
          {loading ? <><span className="spinner" /> Analysing…</> : "◑ Generate SWOT Analysis"}
        </button>
      </div>

      {swot && (
        <div className="swot-grid">
          {Object.entries(swot).map(([key, val]) => (
            <div key={key} className={`swot-card swot-${key}`}>
              <div className="swot-label">{key}</div>
              <div className="swot-title">{val.title}</div>
              <div className="swot-items">
                {val.items.map((item, i) => <div key={i}>• {item}</div>)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── DOUBT WINDOW ──────────────────────────────────────────────────
function DoubtPage() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I'm your AI tutor. Ask me any academic question — concepts, problems, theory, or anything you're stuck on. I'm here to help! 🎓" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(m => [...m, { role: "user", text: userMsg }]);
    setLoading(true);

    const history = messages
      .filter(m => m.role !== "ai" || messages.indexOf(m) > 0)
      .map(m => ({ role: m.role === "ai" ? "assistant" : "user", content: m.text }));
    history.push({ role: "user", content: userMsg });

    const reply = await callClaude(history, "You are a knowledgeable academic tutor for B.Tech Computer Science students at VIT Vellore. Explain concepts clearly and concisely. Use examples. Be encouraging.");
    setMessages(m => [...m, { role: "ai", text: reply }]);
    setLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role === "ai" ? "ai" : "user"}`}>
            <div className="msg-avatar">{m.role === "ai" ? "🤖" : "👤"}</div>
            <div className="msg-bubble" style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
          </div>
        ))}
        {loading && (
          <div className="msg ai">
            <div className="msg-avatar">🤖</div>
            <div className="msg-bubble"><div className="typing"><span /><span /><span /></div></div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input-row">
        <textarea
          className="chat-input"
          rows={2}
          placeholder="Ask your doubt… (Press Enter to send)"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
        />
        <button className="btn btn-primary" onClick={send} disabled={loading || !input.trim()} style={{ alignSelf: "flex-end", height: 42 }}>
          {loading ? <span className="spinner" /> : "Send ↑"}
        </button>
      </div>
    </div>
  );
}

// ── DISCUSSION ────────────────────────────────────────────────────
function DiscussionPage() {
  const [posts, setPosts] = useState([
    { author: "Nikitha N.", time: "2h ago", body: "Can anyone explain the difference between B-Tree and B+ Tree? I'm always confused on this.", aiReply: null },
    { author: "Prakrithi A.", time: "Yesterday", body: "What are the key differences between process and thread in OS? Trying to prepare for the viva.", aiReply: null },
  ]);
  const [newPost, setNewPost] = useState("");
  const [loadingIdx, setLoadingIdx] = useState(null);
  const [posting, setPosting] = useState(false);

  const getAiReply = async (idx) => {
    setLoadingIdx(idx);
    const reply = await callClaude(
      [{ role: "user", content: posts[idx].body }],
      "You are an academic assistant helping CS students. Provide a clear, helpful, concise answer (2-3 paragraphs max)."
    );
    setPosts(p => p.map((post, i) => i === idx ? { ...post, aiReply: reply } : post));
    setLoadingIdx(null);
  };

  const addPost = () => {
    if (!newPost.trim()) return;
    setPosts(p => [{ author: "You", time: "Just now", body: newPost.trim(), aiReply: null }, ...p]);
    setNewPost("");
  };

  return (
    <div>
      <div className="card section-gap">
        <div className="card-title">New Discussion</div>
        <textarea
          className="chat-input full-width"
          rows={3}
          placeholder="Ask a question or start a discussion…"
          value={newPost}
          onChange={e => setNewPost(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />
        <button className="btn btn-primary" onClick={addPost}>Post Question</button>
      </div>

      {posts.map((post, idx) => (
        <div className="post" key={idx}>
          <div className="post-header">
            <div>
              <div className="post-author">👤 {post.author}</div>
              <div className="post-time">{post.time}</div>
            </div>
            {!post.aiReply && (
              <button
                className="btn btn-ghost"
                style={{ fontSize: 12, padding: "6px 12px" }}
                onClick={() => getAiReply(idx)}
                disabled={loadingIdx === idx}
              >
                {loadingIdx === idx ? <><span className="spinner" style={{ width: 12, height: 12 }} /> Getting AI Answer…</> : "🤖 Get AI Answer"}
              </button>
            )}
          </div>
          <div className="post-body">{post.body}</div>
          {post.aiReply && (
            <div className="ai-reply">
              <strong style={{ color: COLORS.purpleLight }}>🤖 AI Assistant:</strong><br />
              <span style={{ whiteSpace: "pre-wrap" }}>{post.aiReply}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── NOTES ─────────────────────────────────────────────────────────
function NotesPage() {
  const [active, setActive] = useState(null);
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [tab, setTab] = useState("browse");

  const notes = [
    { title: "Data Structures — Trees & Graphs", subject: "DS", date: "Mar 12", content: "Complete notes on binary trees, BST, AVL trees, graphs (BFS/DFS), minimum spanning trees, and shortest path algorithms." },
    { title: "DBMS — Normalization (1NF to BCNF)", subject: "DBMS", date: "Mar 10", content: "Detailed notes on functional dependencies, 1NF, 2NF, 3NF, BCNF with examples and decomposition methods." },
    { title: "OS — Process Scheduling Algorithms", subject: "OS", date: "Mar 8", content: "FCFS, SJF, Round Robin, Priority Scheduling with examples, Gantt charts, and comparison tables." },
    { title: "CN — OSI vs TCP/IP Model", subject: "CN", date: "Mar 5", content: "Layer-by-layer comparison of OSI and TCP/IP models, protocols at each layer, and data encapsulation." },
  ];

  const getSummary = async (note) => {
    setLoadingSummary(true);
    setSummary("");
    const reply = await callClaude(
      [{ role: "user", content: `Summarize these study notes in 5 key bullet points for quick revision:\n\n${note.title}\n\n${note.content}` }],
      "You are a study assistant. Generate concise, exam-focused summaries."
    );
    setSummary(reply);
    setLoadingSummary(false);
  };

  return (
    <div>
      <div className="tabs">
        <div className={`tab ${tab === "browse" ? "active" : ""}`} onClick={() => setTab("browse")}>Browse Notes</div>
        <div className={`tab ${tab === "summarize" ? "active" : ""}`} onClick={() => setTab("summarize")}>AI Summarizer</div>
      </div>

      {tab === "browse" && (
        <div className="grid-2">
          {notes.map((n, i) => (
            <div className="note-card" key={i}>
              <div className="flex justify-between items-center mb-8">
                <span className="chip chip-purple">{n.subject}</span>
                <span className="text-sm" style={{ color: COLORS.mutedDark }}>{n.date}</span>
              </div>
              <div className="note-title">{n.title}</div>
              <div className="note-meta mt-8" style={{ marginTop: 8 }}>{n.content.substring(0, 80)}…</div>
              <button className="btn btn-ghost mt-12" style={{ fontSize: 12, padding: "6px 12px" }} onClick={() => { setActive(n); setTab("summarize"); getSummary(n); }}>
                🤖 AI Summary
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === "summarize" && (
        <div>
          <div className="card section-gap">
            <div className="label">Select Notes to Summarize</div>
            <select className="select" onChange={e => { const n = notes[e.target.value]; setActive(n); getSummary(n); setSummary(""); }}>
              <option value="">— Choose notes —</option>
              {notes.map((n, i) => <option value={i} key={i}>{n.title}</option>)}
            </select>
          </div>
          {(loadingSummary || summary) && (
            <div className="card">
              {active && <div className="card-title">{active.title}</div>}
              {loadingSummary ? (
                <div className="flex items-center gap-8" style={{ color: COLORS.mutedDark }}>
                  <span className="spinner" /> Generating AI summary…
                </div>
              ) : (
                <div style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{summary}</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── MARKS ─────────────────────────────────────────────────────────
function MarksPage() {
  const [feedback, setFeedback] = useState({});
  const [loadingFb, setLoadingFb] = useState(null);

  const exams = [
    { name: "CAT-1 — Data Structures", date: "Feb 12", marks: 38, total: 50, grade: "B+" },
    { name: "CAT-1 — DBMS", date: "Feb 14", marks: 42, total: 50, grade: "A" },
    { name: "CAT-1 — Operating Systems", date: "Feb 16", marks: 30, total: 50, grade: "C+" },
    { name: "CAT-2 — Computer Networks", date: "Mar 10", marks: 35, total: 50, grade: "B" },
    { name: "Lab Exam — OOP Java", date: "Mar 18", marks: 44, total: 50, grade: "A+" },
  ];

  const getFeedback = async (exam) => {
    setLoadingFb(exam.name);
    const reply = await callClaude(
      [{ role: "user", content: `I scored ${exam.marks}/${exam.total} (${exam.grade}) in ${exam.name}. What are 3 specific areas I should focus on to improve? Be actionable and concise.` }],
      "You are a constructive academic feedback provider. Give specific, actionable study advice."
    );
    setFeedback(f => ({ ...f, [exam.name]: reply }));
    setLoadingFb(null);
  };

  return (
    <div>
      <div className="card section-gap">
        <div className="card-title">Exam Scores</div>
        {exams.map((e, i) => (
          <div key={i}>
            <div className="marks-row">
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: COLORS.offWhite }}>{e.name}</div>
                <div className="text-muted" style={{ marginTop: 2 }}>{e.date}</div>
              </div>
              <div className="flex items-center gap-12">
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: e.marks / e.total > 0.8 ? COLORS.green : e.marks / e.total > 0.6 ? COLORS.yellow : COLORS.red }}>
                    {e.marks}/{e.total}
                  </div>
                  <span className={`chip ${e.marks / e.total > 0.8 ? "chip-green" : e.marks / e.total > 0.6 ? "chip-yellow" : "chip-red"}`}>{e.grade}</span>
                </div>
                <button
                  className="btn btn-ghost"
                  style={{ fontSize: 12, padding: "6px 10px" }}
                  onClick={() => getFeedback(e)}
                  disabled={loadingFb === e.name}
                >
                  {loadingFb === e.name ? <span className="spinner" style={{ width: 12, height: 12 }} /> : "AI Feedback"}
                </button>
              </div>
            </div>
            {feedback[e.name] && (
              <div style={{ margin: "8px 0 16px", padding: "12px 16px", background: COLORS.surfaceAlt, borderRadius: 10, fontSize: 13, color: COLORS.muted, borderLeft: `3px solid ${COLORS.purple}`, whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
                {feedback[e.name]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ASSIGNMENTS ───────────────────────────────────────────────────
function AssignmentsPage({ role }) {
  const [assignments] = useState([
    { title: "DS Assignment 3 — Graph Problems", subject: "Data Structures", due: "Mar 28", status: "pending", desc: "Implement Dijkstra's and Bellman-Ford algorithms." },
    { title: "DBMS Lab — ER Diagram Design", subject: "DBMS", due: "Mar 30", status: "submitted", desc: "Design ER diagram for a Library Management System." },
    { title: "OS Worksheet — Scheduling", subject: "Operating Systems", due: "Apr 2", status: "pending", desc: "Solve 5 scheduling algorithm problems with Gantt charts." },
    { title: "CN Assignment — Subnetting", subject: "Computer Networks", due: "Apr 5", status: "pending", desc: "Subnetting exercises with VLSM and CIDR notation." },
  ]);
  const [hints, setHints] = useState({});
  const [loadingHint, setLoadingHint] = useState(null);

  const getHint = async (a) => {
    setLoadingHint(a.title);
    const reply = await callClaude(
      [{ role: "user", content: `Give me 3 helpful hints to get started on this assignment: "${a.title}" — ${a.desc}` }],
      "You are a helpful academic assistant. Give concise, useful hints to help students start their assignments."
    );
    setHints(h => ({ ...h, [a.title]: reply }));
    setLoadingHint(null);
  };

  return (
    <div>
      {assignments.map((a, i) => (
        <div className="card section-gap" key={i} style={{ marginBottom: 14 }}>
          <div className="flex justify-between items-center" style={{ marginBottom: 10 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.offWhite, marginBottom: 4 }}>{a.title}</div>
              <div className="flex items-center gap-8">
                <span className="chip chip-purple">{a.subject}</span>
                <span className="text-muted">Due: {a.due}</span>
              </div>
            </div>
            <span className={`chip ${a.status === "submitted" ? "chip-green" : "chip-yellow"}`}>
              {a.status === "submitted" ? "✓ Submitted" : "⏳ Pending"}
            </span>
          </div>
          <div style={{ fontSize: 13.5, color: COLORS.muted, marginBottom: 12 }}>{a.desc}</div>
          <div className="flex gap-8">
            <button
              className="btn btn-ghost"
              style={{ fontSize: 12 }}
              onClick={() => getHint(a)}
              disabled={loadingHint === a.title}
            >
              {loadingHint === a.title ? <><span className="spinner" style={{ width: 12, height: 12 }} /> Getting hints…</> : "💡 Get AI Hints"}
            </button>
            {a.status === "pending" && <button className="btn btn-primary" style={{ fontSize: 12 }}>⬆ Submit</button>}
          </div>
          {hints[a.title] && (
            <div style={{ marginTop: 12, padding: "12px 16px", background: COLORS.surfaceAlt, borderRadius: 10, fontSize: 13, color: COLORS.muted, borderLeft: `3px solid ${COLORS.yellow}`, whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
              <strong style={{ color: COLORS.yellow }}>💡 Hints:</strong><br />{hints[a.title]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── APP ROOT ──────────────────────────────────────────────────────
const PAGE_TITLES = {
  dashboard: "Dashboard",
  quiz: "Quizzes & PYQ Practice",
  swot: "SWOT Analysis",
  doubt: "Doubt Window",
  discussion: "Discussion Platform",
  notes: "Notes",
  marks: "Marks & Paper Review",
  assignments: "Assignments",
};

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [role, setRole] = useState("student");

  const sections = [...new Set(NAV.map(n => n.section))];

  return (
    <>
      <style>{styles}</style>
      <div className="app-shell">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-title">SURVIVE THE<br />SEMESTER</div>
            <div className="logo-sub">VIT Vellore</div>
            <span className="logo-badge">AI Powered</span>
          </div>

          {sections.map(sec => (
            <div className="sidebar-section" key={sec}>
              <div className="sidebar-section-label">{sec}</div>
              {NAV.filter(n => n.section === sec).map(n => (
                <div
                  key={n.id}
                  className={`nav-item ${page === n.id ? "active" : ""}`}
                  onClick={() => setPage(n.id)}
                >
                  <span className="nav-icon">{n.icon}</span>
                  {n.label}
                </div>
              ))}
            </div>
          ))}

          <div style={{ flex: 1 }} />
          <div style={{ padding: "16px 20px", borderTop: `1px solid ${COLORS.border}`, fontSize: 11, color: COLORS.mutedDark }}>
            <div style={{ marginBottom: 2, fontWeight: 600, color: COLORS.muted }}>John Doe</div>
            <div>VIT — B.Tech CSE, Yr 2</div>
          </div>
        </aside>

        <main className="main">
          <div className="topbar">
            <div className="page-title">{PAGE_TITLES[page]}</div>
            <div className="role-badge">
              <button className={`badge ${role === "student" ? "active" : ""}`} onClick={() => setRole("student")}>Student</button>
              <button className={`badge ${role === "teacher" ? "active" : ""}`} onClick={() => setRole("teacher")}>Teacher</button>
            </div>
          </div>

          <div className="content-area">
            {page === "dashboard" && <Dashboard role={role} />}
            {page === "quiz" && <QuizPage />}
            {page === "swot" && <SwotPage />}
            {page === "doubt" && <DoubtPage />}
            {page === "discussion" && <DiscussionPage />}
            {page === "notes" && <NotesPage />}
            {page === "marks" && <MarksPage />}
            {page === "assignments" && <AssignmentsPage role={role} />}
          </div>
        </main>
      </div>
    </>
  );
}
