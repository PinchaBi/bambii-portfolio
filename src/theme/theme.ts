import { createTheme } from "@mui/material/styles";
import type { TypographyVariantsOptions } from "@mui/material/styles";
import type {
  Components,
  PaletteMode,
  PaletteOptions,
  ThemeOptions,
} from "@mui/material/styles";

export const colors = {
  bambiiBlack: "#171615",
  bambiiBlue: "#070760",
  bambiiGray: "#EEEEEE",
  bambiiGreen: "##08B94F",
  bambiiPink: "#F13A7D",

  lightBlue: "#BFEAFF",
  lightGreen: "#B2EBB2",
  lightGray: "#F5F5F5",
  lightPink: "#FFD9E7",

  mediumGray: "#D9D9D9",

  darkGray: "#3D3D3D",
  darkGray2: "#4E4E4E",
  darkGray3: "#777777",
};

const buildPalette = (mode: PaletteMode): PaletteOptions => ({
  mode,
  colors,
  primary: {
    main: colors.bambiiPink,
  },
  secondary: {
    main: colors.bambiiBlue,
  },
  background: {
    default: colors.bambiiGray,
  },
  text: {
    primary: colors.bambiiBlack,
    secondary: colors.darkGray,
  },
});

const components: Components = {
  MuiCssBaseline: {
    styleOverrides: {},
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        bgcolor: colors.bambiiGray,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        boxShadow: "0px 2px 7px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        boxShadow: "0px 2px 7px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  MuiStack: {
    styleOverrides: {
      root: {
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      },
    },
  },
};

const typography: TypographyVariantsOptions = {
  fontFamily: '"Figtree", system-ui, sans-serif',
  h1: { fontWeight: 700, fontSize: "3rem" },
  h2: { fontWeight: 700, fontSize: "2.25rem" },
  h3: { fontWeight: 600, fontSize: "2rem" },
  h4: { fontWeight: 600, fontSize: "1.75rem" },
  subtitle1: { fontWeight: 500, fontSize: "1.5rem" },
  subtitle2: { fontWeight: 500, fontSize: "0.75rem" },
  body1: { fontWeight: 400, fontSize: "1rem" },
  body2: { fontWeight: 400, fontSize: "1rem" },
  button: {
    fontWeight: 500,
    fontSize: "1rem",
    lineHeight: 1.25,
    textTransform: "none",
  },
  caption: { fontWeight: 400, fontSize: "0.875rem" },
  overline: { fontWeight: 400, fontSize: "0.75rem", textTransform: "none" },
};

const baseOptions = {
  components: components,
  typography: typography,
};

const lightThemeOption: ThemeOptions = {
  palette: buildPalette("light"),
  ...baseOptions,
};
const darkThemeOption: ThemeOptions = {
  palette: buildPalette("dark"),
  ...baseOptions,
};

export const lightTheme = createTheme(lightThemeOption);
export const darkTheme = createTheme(darkThemeOption);
