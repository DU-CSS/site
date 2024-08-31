"use client"

import { extendTheme } from "@chakra-ui/react";
import '@fontsource-variable/inter';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'black',
        color: 'white',
        heading: `'Inter Variable', sans-serif`,
        body: `'Inter Variable', sans-serif`,
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        color: "#111111"
      }
    },
    Text: {
      baseStyle: {
        color: "#111111"
      }
    },
    Link: {
      baseStyle: {
        fontWeight: "regular",
      }
    },
    MenuItem: {
      baseStyle: {
        fontWeight: "regular"
      }
    }
  }
})

export const breakpoints = {
  base: '0em', // 0px
  sm: '30em', // ~480px. em is a relative unit and is dependant on the font size.
  md: '48em', // ~768px
  lg: '62em', // ~992px
  xl: '80em', // ~1280px
  '2xl': '96em', // ~1536px
}