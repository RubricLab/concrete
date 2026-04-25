// Composer.jsx — prompt composer, sticky at the bottom
const { useState: useStateC } = React;

function Composer({ onSend }) {
  const [value, setValue] = useStateC("");
  const count = value.length;
  return (
    <div className="composer-wrap">
      <div className="composer">
        <textarea
          placeholder="Reply to Concrete…  (⌘↵ to send)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              if (value.trim()) { onSend(value); setValue(""); }
            }
          }}
        />
        <div className="composer-bar">
          <button className="btn-ghost" type="button">
            <svg viewBox="0 0 24 24"><path d="M21.44 11.05 12.25 20.24a6 6 0 0 1-8.49-8.49l8.57-8.57a4 4 0 0 1 5.66 5.66l-8.6 8.57a2 2 0 0 1-2.83-2.83l7.93-7.93"/></svg>
            Attach
          </button>
          <button className="btn-ghost" type="button">
            <svg viewBox="0 0 24 24"><path d="M4 17l6-6-6-6M12 19h8"/></svg>
            Tools
          </button>
          <button className="btn-ghost" type="button">
            <svg viewBox="0 0 24 24"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
            Sonnet 4.5
          </button>
          <span className="spacer" />
          <span className="count">{count}/8,000</span>
          <button
            className="btn-send"
            type="button"
            onClick={() => { if (value.trim()) { onSend(value); setValue(""); } }}
          >
            Send<span className="bk">⌘</span><span className="bk">↵</span>
          </button>
        </div>
      </div>
    </div>
  );
}

window.Composer = Composer;
