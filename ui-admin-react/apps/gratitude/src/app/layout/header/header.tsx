import { useAuth0 } from '@auth0/auth0-react';
import { AppBar, Button, Link, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { isAuthenticatedState } from '../../store/user';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null);
  const { loginWithRedirect, logout } = useAuth0();

  const accountClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorElement(event.currentTarget);
  };

  const accountMenuCloseHandler = () => {
    setAnchorElement(null);
  };

  const logoutHandler = () => {
    setAnchorElement(null);
    logout({ returnTo: window.location.origin });
  };

  return (
    <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <StyledToolbar>
        <Logo>
          <RouterLink to="/">
            <img
              src="assets/images/logo.svg"
              alt="Gratitude | Management Portal"
              title="Gratitude | Management Portal"
            />
          </RouterLink>
        </Logo>
        <Link component={RouterLink} to="/about">
          About
        </Link>
        <Link component={RouterLink} to="/features">
          Features
        </Link>
        <Link component={RouterLink} to="/contact">
          Contact
        </Link>
        {isAuthenticated && (
          <>
            <Button onClick={accountClickHandler}>My Account</Button>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElement}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElement)}
              onClose={accountMenuCloseHandler}
            >
              <MenuItem onClick={logoutHandler}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </>
        )}
        {!isAuthenticated && <Link onClick={() => loginWithRedirect()}>Login</Link>}
      </StyledToolbar>
    </AppBar>
  );
}

export default Header;

const StyledToolbar = styled(Toolbar)`
  background-color: #000;
  gap: 3.25rem;
  && {
    padding-right: 4rem;
    a,
    button {
      color: #ffffff;
      text-decoration: none;
      text-transform: capitalize;
      font-weight: 300;
    }
  }
`;

const Logo = styled.div`
  flex-grow: 1;
`;
