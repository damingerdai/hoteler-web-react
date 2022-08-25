import React from 'react';
import { Box, keyframes } from '@chakra-ui/react';

const skFoldCubeAngle = keyframes`
  0%,
  10% {
    -webkit-transform: perspective(140px) rotateX(-180deg);
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
  75% {
    -webkit-transform: perspective(140px) rotateX(0deg);
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  }
  90%,
  100% {
    -webkit-transform: perspective(140px) rotateY(180deg);
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
`;

const ChildFoldingCube: React.FC<{ i: number }> = ({ i }) => {
  const n = (3 * (i - 1)) / 10;
  const animationDelay = i > 1 ? `${n}s` : undefined;
  const transform = i <= 1 ? 'scale(1.1)' : `scale(1.1) rotateZ(${90 * i - 90}deg)`;

  return (
    <Box
      float='left'
      w='50%'
      h='50%'
      position='relative'
      transform={transform}
      _before={{
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--chakra-colors-teal-500)',
        transformOrigin: '100% 100%',
        animation: `${skFoldCubeAngle} 2.4s infinite linear both`,
        animationDelay,
      }}
    />
  );
};

export const FoldingCube:React.MemoExoticComponent<React.FC> = React.memo(() => (
  <Box
    m='20px auto'
    w='40px'
    h='40px'
    position='relative'
    transform='rotateZ(45deg)'
  >
    {[1, 2, 3, 4].map((i) => (
      <ChildFoldingCube key={i} i={i} />
    ))}
  </Box>
));
