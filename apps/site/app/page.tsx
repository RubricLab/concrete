import { Badge, Button, Card, DensityFrame, Input, Label, Stack } from '@concrete/ui';

export default function HomePage() {
  return (
    <>
      <header className="page-header">
        <p className="concrete-label">Rubric Labs Design System</p>
        <h1 className="display-title">Concrete</h1>
        <p>
          An agentic-first system with four pressure modes that move from editorial clarity to
          product density without losing typographic and semantic integrity.
        </p>
      </header>
      <DensityFrame density="generative">
        <div className="grid-2">
          <Card>
            <Stack>
              <Label>Mission</Label>
              <p>
                Single language across editorial publishing, AI interfaces, and dense dashboards.
              </p>
              <Button>Read the system</Button>
            </Stack>
          </Card>
          <Card>
            <Stack>
              <Label>Signals</Label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Badge signal="terminal">Live</Badge>
                <Badge signal="ultra">Featured</Badge>
                <Badge signal="error">Risk</Badge>
              </div>
              <Input defaultValue="context-architecture" />
            </Stack>
          </Card>
        </div>
      </DensityFrame>
    </>
  );
}
