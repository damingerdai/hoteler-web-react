import { mode } from '@chakra-ui/theme-tools';
import { extendTheme } from '@chakra-ui/react';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
};
/**
 * https://material.angular.io/cdk/layout/overview
 * const breakpoints = createBreakpoints({
    sm: '30em',
    md: '769px',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  });
 */
const breakpoints = {
  sm: '480px',
  md: '600px',
  lg: '960px',
  xl: '1280px',
  '2xl': '1920px',
};

const customTheme = extendTheme({
  config,
  breakpoints,
  colors: {
    dark: {
      500: '#001529',
    },
    brand: {
      orange: '#d04a02',
      gray: 'rgba(100, 100, 100, 0.7)',
      'light-gray': 'rgba(0, 0, 0, 0.35)',
      teal: 'rgb(92, 185, 189)',
      'light-teal': '#5CB9BD',
      purple: 'rgb(102, 125, 255)',
      yellow: '#FFB700',
    },
    brightYellow: {
      200: '#C9B06E',
      500: '#FFB700',
    },
  },
  components: {
    Button: {
      baseStyle: {
        position: 'static',
      },
    },
  },
  styles: {
    global: (props: any) => ({
      fontFamily: 'body',
      lineHeight: 'base',
      '*::placeholder': {
        color: mode('gray.400', 'whiteAlpha.400')(props),
      },
      '*, *::before, &::after': {
        borderColor: mode('gray.200', 'gray.500')(props),
        wordWrap: 'break-word',
      },
      fontFeatureSettings: '"pnum"',
      fontVariantNumeric: 'proportional-nums',
      'html, body': {
        color: mode('black !important', 'white  !important')(props),
        bg: mode('#EDF2F7 !important', '#1A202C !important')(props),
        padding: 0,
        margin: 0,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
        height: '100%',
        width: '100%',
      },
      'h1, h2, h3, h4, h5, h6': {
        fontWeight: 'bold',
      },
      h1: {
        fontSize: '2em',
      },
      h2: {
        fontSize: '1.5em',
      },
      h3: {
        fontSize: '1.17em',
      },
      h4: {
        fontSize: '1em',
      },
      h5: {
        fontSize: '0.83em',
      },
      h6: {
        fontSize: '0.67em',
      },
    }),
  },
});

export const defaultToastOptions = {
  duration: 3000,
  isClosable: true,
};

export default customTheme;
