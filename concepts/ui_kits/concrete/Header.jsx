// Header.jsx — Concrete UI kit top bar
function Header({ threadTitle }) {
  return (
    <header className="hdr">
      <div className="crumb">
        <span>ari</span>
        <span className="sep">/</span>
        <span>threads</span>
        <span className="sep">/</span>
        <b>{threadTitle}</b>
      </div>
      <span className="pill"><i/>Live</span>
      <span className="spacer" />
      <button className="model" type="button">
        <span>Claude Sonnet 4.5</span>
        <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
      </button>
      <button className="cmdk" type="button">
        <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>
        <span>Command palette</span>
        <span className="bk">⌘K</span>
      </button>
      <button className="icon-btn" type="button" aria-label="Share">
        <svg viewBox="0 0 24 24"><path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"/><path d="M16 6l-4-4-4 4M12 2v14"/></svg>
      </button>
      <button className="icon-btn" type="button" aria-label="More">
        <svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>
      </button>
    </header>
  );
}
window.Header = Header;
