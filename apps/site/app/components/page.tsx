import { componentNames } from '@/lib/component-state';

export default function ComponentsPage() {
  return (
    <>
      <header className="page-header">
        <p className="concrete-label">Components</p>
        <h1>Deterministic rendering</h1>
        <p>Each component has a query-driven route and an image endpoint for snapshots.</p>
      </header>
      <div className="component-grid">
        {componentNames.map((name) => (
          <article className="concrete-card preview" key={name}>
            <h3>{name}</h3>
            <a href={`/components/${name}?density=product`}>Interactive route</a>
            <a href={`/components/${name}.jpg?density=product`}>Image route</a>
          </article>
        ))}
      </div>
    </>
  );
}
