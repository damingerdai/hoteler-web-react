// src/theme.ts
import { createSystem, defaultConfig } from '@chakra-ui/react';

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#e6f2ff' },
          // ... up to 950
        },
      },
      fonts: {
        heading: { value: "'Inter', sans-serif" },
        body: { value: "'Inter', sans-serif" },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: '{colors.brand.500}' },
          // ... other semantic values
        },
      },
    },
  },
});
