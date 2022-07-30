import { Box, CssBaseline, Drawer, Toolbar } from '@mui/material';
import { PropsWithChildren } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { isAuthenticatedState } from '../../store/user';
import { Footer } from '../footer';
import { Header } from '../header';
import { Navigation } from '../navigation';

/* eslint-disable-next-line */
export interface ShellProps extends PropsWithChildren {}

export function Shell(props: ShellProps) {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);

  const drawerWidth = 345;
  return (
    <Container>
      <CssBaseline />
      <Header />

      {isAuthenticated && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#e4ebef' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <Navigation />
          </Box>
        </Drawer>
      )}
      <Content component="main" showBackgroundImage={!isAuthenticated}>
        <Body>{props.children}</Body>
        <StyledFooter isTransparent={!isAuthenticated} />
      </Content>
    </Container>
  );
}

export default Shell;

const Container = styled(Box)`
  min-height: 100vh;
  display: flex;
`;

const Content = styled(Box)<{ showBackgroundImage: boolean }>`
  min-height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  ${({ showBackgroundImage }) =>
    showBackgroundImage
      ? `
  background-color: #000000;
  background-repeat: no-repeat;
  background-image: url('/assets/images/page-background.jpg');
  background-image: linear-gradient(146deg, rgba(0, 0, 0, 0.93) -2%, rgba(0, 0, 0, 0.02) 59%),
    url('/assets/images/page-background.jpg');
  background-size: cover;
  `
      : ''}
`;

const Body = styled(Box)`
  flex-grow: 1;
`;

const StyledFooter = styled(Footer)`
  flex-shrink: 0;
`;
