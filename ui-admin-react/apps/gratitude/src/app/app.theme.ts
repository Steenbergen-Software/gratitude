import { createTheme } from '@mui/material';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    large: true;
  }
}

export const appTheme = createTheme({
  palette: {
    primary: {
      main: '#2597c6',
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'large' },

          style: {
            width: '250px',
            height: '75px',
            fontSize: '20px',
            letterSpacing: '2px',
            color: '#ffffff',
            backgroundColor: '#2a82b5',
            backgroundImage: 'linear-gradient(to bottom, #42a5d1, #2a82b5)',
            textTransform: 'uppercase',
            borderRadius: '100px',
            '&:hover': {
              backgroundColor: '#000000',
              backgroundImage: 'unset',
            },
          },
        },
      ],
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            borderLeft: '5px solid #2597c6',
            backgroundColor: 'unset',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '0.95rem',
          fontWeight: 500,
        },
      },
    },
  },
});
