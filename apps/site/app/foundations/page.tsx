const swatches = [
  ['--canvas', 'Canvas'],
  ['--surface', 'Surface'],
  ['--ink-9', 'Ink 9'],
  ['--ink-5', 'Ink 5'],
  ['--sky', 'Sky'],
  ['--terminal', 'Terminal'],
  ['--ultra', 'Ultra'],
  ['--error', 'Error'],
] as const;

export default function FoundationsPage() {
  return (
    <>
      <header className="page-header">
        <p className="concrete-label">Foundations</p>
        <h1>Tokens</h1>
      </header>
      <section className="grid-2">
        {swatches.map(([token, label]) => (
          <article className="concrete-card" key={token}>
            <div className="token-row">
              <span className="swatch" style={{ background: `var(${token})` }} />
              <div>
                <div>{label}</div>
                <code>{token}</code>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
