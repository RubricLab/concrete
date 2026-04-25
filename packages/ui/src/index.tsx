import type { Density } from '@concrete/tokens';
import { densityClassName } from '@concrete/tokens';
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

export { type Density, densities } from '@concrete/tokens';

export function DensityFrame({
  density,
  className,
  children,
}: PropsWithChildren<{ density: Density; className?: string }>) {
  return (
    <div className={[densityClassName[density], className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}

export function Stack(props: ComponentPropsWithoutRef<'div'>) {
  return (
    <div {...props} className={['concrete-stack', props.className].filter(Boolean).join(' ')} />
  );
}

export function Card(props: ComponentPropsWithoutRef<'section'>) {
  return (
    <section {...props} className={['concrete-card', props.className].filter(Boolean).join(' ')} />
  );
}

export function Label(props: ComponentPropsWithoutRef<'p'>) {
  return <p {...props} className={['concrete-label', props.className].filter(Boolean).join(' ')} />;
}

export function Button({
  variant = 'primary',
  ...props
}: ComponentPropsWithoutRef<'button'> & { variant?: 'primary' | 'secondary' }) {
  return (
    <button
      {...props}
      className={['concrete-button', props.className].filter(Boolean).join(' ')}
      data-variant={variant}
    />
  );
}

export function Input(props: ComponentPropsWithoutRef<'input'>) {
  return (
    <input {...props} className={['concrete-input', props.className].filter(Boolean).join(' ')} />
  );
}

export function Badge({
  signal = 'terminal',
  ...props
}: ComponentPropsWithoutRef<'span'> & { signal?: 'terminal' | 'ultra' | 'error' }) {
  return (
    <span
      {...props}
      className={['concrete-badge', props.className].filter(Boolean).join(' ')}
      data-signal={signal}
    />
  );
}
