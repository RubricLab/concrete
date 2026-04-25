export const densities = ['product', 'generative', 'editorial', 'educational'] as const;

export type Density = (typeof densities)[number];

export const densityClassName: Record<Density, string> = {
  product: 'density-product',
  generative: 'density-generative',
  editorial: 'density-editorial',
  educational: 'density-educational',
};
