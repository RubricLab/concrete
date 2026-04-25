// Sidebar.jsx — Concrete UI kit
const { useState } = React;

function Ico({ d, fill }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} fill={fill || "none"} />
    </svg>
  );
}

function Sidebar({ threads, activeId, onPick }) {
  return (
    <aside className="sb">
      <div className="sb-head">
        <span className="sb-mark">
          <svg viewBox="0 0 900 900"><path d="M300 600V300H400V400H500V300H600V400H500V500H400V600H300Z"/></svg>
        </span>
        <span className="sb-name">Rubric</span>
        <span className="sb-ws" title="Switch workspace">
          <svg viewBox="0 0 24 24"><path d="M7 10l5-5 5 5M7 14l5 5 5-5"/></svg>
        </span>
      </div>

      <div className="sb-search">
        <div className="input-wrap" style={{ position: "relative" }}>
          <svg className="lead" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>
          <input placeholder="Search" />
          <span className="bk">⌘K</span>
        </div>
      </div>

      <nav className="sb-nav">
        <div className="sb-item is-active">
          <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          Threads<span className="count">24</span>
        </div>
        <div className="sb-item">
          <svg viewBox="0 0 24 24"><path d="M2 3h6l2 3h12v13a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/></svg>
          Library<span className="count">112</span>
        </div>
        <div className="sb-item">
          <svg viewBox="0 0 24 24"><path d="M12 2a5 5 0 0 0-5 5v3a7 7 0 0 0-2 5v1h14v-1a7 7 0 0 0-2-5V7a5 5 0 0 0-5-5zM9 17v1a3 3 0 0 0 6 0v-1"/></svg>
          Agents<span className="count">5</span>
        </div>
        <div className="sb-item">
          <svg viewBox="0 0 24 24"><path d="M4 17l6-6-6-6M12 19h8"/></svg>
          Runs
        </div>
      </nav>

      <div className="sb-section">
        <span>Recent</span>
        <button title="New thread">
          <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>

      <div className="sb-threads">
        {threads.map((t) => (
          <div
            key={t.id}
            className={"sb-thread" + (t.id === activeId ? " is-active" : "")}
            onClick={() => onPick(t.id)}
          >
            <b>{t.live && <i className="live" />}{t.title}</b>
            <i>{t.ts}</i>
            <p>{t.preview}</p>
          </div>
        ))}
      </div>

      <div className="sb-foot">
        <span className="av">AK</span>
        <div className="who">
          <b>Ari Katsumoto</b>
          <span>ari@rubric.bot</span>
        </div>
        <button className="cog" title="Settings">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        </button>
      </div>
    </aside>
  );
}

window.Sidebar = Sidebar;
