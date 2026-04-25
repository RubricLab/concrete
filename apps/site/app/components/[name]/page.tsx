import { Badge, Button, Card, DensityFrame, Input, Stack } from '@concrete/ui';
import { notFound } from 'next/navigation';

import { componentNames, parseState } from '@/lib/component-state';

export default async function ComponentPage({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { name } = await params;
  if (!componentNames.includes(name as (typeof componentNames)[number])) {
    notFound();
  }
  const state = parseState(await searchParams);
  return (
    <DensityFrame density={state.density}>
      <Card>
        <Stack>
          {name === 'button' && (
            <Button variant={state.variant === 'secondary' ? 'secondary' : 'primary'}>
              {state.label}
            </Button>
          )}
          {name === 'input' && <Input defaultValue={state.value} />}
          {name === 'badge' && <Badge signal={state.signal}>{state.label}</Badge>}
          {name === 'card' && (
            <Card>
              <p>{state.label}</p>
            </Card>
          )}
        </Stack>
      </Card>
    </DensityFrame>
  );
}
