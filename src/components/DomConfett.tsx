import * as React from 'react';
import { useRef } from 'react';
import { confetti } from 'dom-confetti';

const style = {
  position: 'relative',
} as React.CSSProperties;

interface ConfettiConfig {
  angle?: number;
  spread?: number;
  width?: string;
  height?: string;
  duration?: number;
  dragFriction?: number;
  stagger?: number;
  startVelocity?: number;
  elementCount?: number;
  decay?: number;
  colors?: string[];
  random?: () => number;
}

interface ConfettiProps {
  config?: ConfettiConfig;
}

export function createDomConfett(props?: { className?: string } & ConfettiProps) {
  const { className, config } = props || {};
  const ref = useRef<HTMLDivElement>(null);

  const Container: React.FC<React.PropsWithChildren> = ({ children }) => (
    <div className={className} style={style} ref={ref}>{children}</div>
  );

  const confettFn = () => {
    if (ref.current) {
      confetti(ref.current, config);
    }
  };

  return {
    Container,
    confett: confettFn,
  };
}
