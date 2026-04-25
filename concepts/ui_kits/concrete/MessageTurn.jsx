// MessageTurn.jsx — user / assistant turns + tool-call sub-block
function UserTurn({ text, ts }) {
  return (
    <div className="turn">
      <span className="av av--u">AK</span>
      <div>
        <div className="who"><b>Ari</b><span className="ts">{ts}</span></div>
        <div className="prose"><p>{text}</p></div>
      </div>
    </div>
  );
}

function ToolCall({ name, args, body, status }) {
  return (
    <div className="toolcall">
      <div className="toolcall-head">
        <span className="caret">
          <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
        </span>
        <b>{name}</b>
        <span className="arg">{args}</span>
        {status === "ok" && <span className="pill-ok"><i/>200</span>}
      </div>
      <pre className="toolcall-body">{body}</pre>
    </div>
  );
}

function Citation({ n, title, host }) {
  return (
    <span className="cite">
      <span className="n">{n}</span>
      <span>{title}</span>
      <span className="host">{host}</span>
    </span>
  );
}

function AssistantTurn({ children, ts, cites }) {
  return (
    <div className="turn">
      <span className="av av--a">
        <svg viewBox="0 0 900 900"><path d="M300 600V300H400V400H500V300H600V400H500V500H400V600H300Z"/></svg>
      </span>
      <div>
        <div className="who">
          <b>Concrete</b>
          <span className="model-chip">SONNET 4.5</span>
          <span className="ts">{ts}</span>
        </div>
        <div className="prose">{children}</div>
        {cites && cites.length > 0 && (
          <div className="cites">
            {cites.map((c, i) => <Citation key={i} {...c} />)}
          </div>
        )}
      </div>
    </div>
  );
}

window.UserTurn = UserTurn;
window.AssistantTurn = AssistantTurn;
window.ToolCall = ToolCall;
