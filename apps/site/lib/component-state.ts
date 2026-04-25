import { z } from 'zod';

export const componentNames = ['button', 'input', 'badge', 'card'] as const;

export type ComponentName = (typeof componentNames)[number];

const densitySchema = z
  .enum(['product', 'generative', 'editorial', 'educational'])
  .default('product');

export const componentStateSchema = z.object({
  density: densitySchema,
  variant: z.string().default('primary'),
  label: z.string().default('Execute task'),
  value: z.string().default('agent-memory-v2'),
  signal: z.enum(['terminal', 'ultra', 'error']).default('terminal'),
});

export type ComponentState = z.infer<typeof componentStateSchema>;

export function parseState(
  searchParams: Record<string, string | string[] | undefined>
): ComponentState {
  const flattened = Object.fromEntries(
    Object.entries(searchParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ])
  );
  return componentStateSchema.parse(flattened);
}
