import { Badge, Button, Card, DensityFrame, Input, Label, Stack } from '@concrete/ui';

const densities = ['product', 'generative', 'editorial', 'educational'] as const;

export default function PrimitivesPage() {
  return (
    <>
      <header className="page-header">
        <p className="concrete-label">Primitives</p>
        <h1>Core atoms</h1>
      </header>
      <div className="component-grid">
        {densities.map((density) => (
          <Card key={density}>
            <DensityFrame density={density}>
              <Stack>
                <Label>{density}</Label>
                <Button>Run</Button>
                <Input defaultValue="query context" />
                <Badge signal="terminal">active</Badge>
              </Stack>
            </DensityFrame>
          </Card>
        ))}
      </div>
    </>
  );
}
