import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

/* eslint-disable-next-line */
export interface NavigationProps {}

export function Navigation(props: NavigationProps) {
  const location = useLocation();
  const [openState, setOpenState] = useState({
    home: false,
    apiRequests: false,
    altair: false,
  });

  const setOpen = (value: 'home' | 'apiRequests' | 'altair') => {
    openState[value] = !openState[value];
    setOpenState({ ...openState });
  };

  useEffect(() => {
    if (location.pathname === '/') {
      setOpenState((oldValue) => {
        return { ...oldValue, home: true };
      });
    }
    if (location.pathname.indexOf('/api-requests') >= 0) {
      setOpenState((oldValue) => {
        return { ...oldValue, apiRequests: true };
      });
    }
    if (location.pathname.indexOf('/altair') >= 0) {
      setOpenState((oldValue) => {
        return { ...oldValue, altair: true };
      });
    }
  }, [location]);

  const inLocation = (value: string) => {
    return location.pathname.indexOf(value) >= 0;
  };

  return (
    <StyledList>
      <LevelOneItem selected={location.pathname === '/'} onClick={() => setOpen('home')}>
        <ListItemText primary="Home" />
        {openState.home ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </LevelOneItem>
      <Collapse in={openState.home} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <LevelTwoItem component={RouterLink} to="/" sx={{ pl: 4 }}>
            <ListItemText primary="Get Support" />
          </LevelTwoItem>
        </List>
      </Collapse>
      <LevelOneItem
        selected={inLocation('/api-requests') && !inLocation('/altair')}
        onClick={() => setOpen('apiRequests')}
      >
        <ListItemText primary="How to Make API Requests" />
        {openState.apiRequests ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </LevelOneItem>
      <Collapse in={openState.apiRequests} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <LevelTwoItem component={RouterLink} to="/api-requests/intro" sx={{ pl: 4 }}>
            <ListItemText primary="Intro to GraphQL" />
          </LevelTwoItem>
          <LevelTwoItem selected={inLocation('/altair')} sx={{ pl: 4 }} onClick={() => setOpen('altair')}>
            <ListItemText primary="Using Altair GraphQL Client" />
            {openState.altair ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </LevelTwoItem>
          <Collapse in={openState.altair} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <LevelThreeItem component={RouterLink} to="/api-requests/altair/install" sx={{ pl: 8 }}>
                <ListItemText primary="Install Altair" />
              </LevelThreeItem>
              <LevelThreeItem component={RouterLink} to="/api-requests/altair/getting-started" sx={{ pl: 8 }}>
                <ListItemText primary="Getting Started" />
              </LevelThreeItem>
              <LevelThreeItem component={RouterLink} to="/api-requests/altair/tips" sx={{ pl: 8 }}>
                <ListItemText primary="Tips" />
              </LevelThreeItem>
              <LevelThreeItem component={RouterLink} to="/api-requests/altair/resources" sx={{ pl: 8 }}>
                <ListItemText primary="GraphQL Resources" />
              </LevelThreeItem>
            </List>
          </Collapse>
        </List>
      </Collapse>
      <LevelOneItem selected={location.pathname === '/data-dictionary'} component={RouterLink} to="/data-dictionary">
        <ListItemText primary="Data Dictionary" />
      </LevelOneItem>
      <LevelOneItem selected={location.pathname === '/release-notes'} component={RouterLink} to="/release-notes">
        <ListItemText primary="Release Notes" />
      </LevelOneItem>
      <LevelOneItem>
        <ListItemText primary="Additional Documentation" />
      </LevelOneItem>
    </StyledList>
  );
}

export default Navigation;

const activeBullet = css`
  &.active {
    position: relative;
    .MuiListItemText-primary {
      &::before {
        content: '';
        display: inline-block;
        margin: 0 0.7rem 0.2rem -1rem;

        width: 0.3rem;
        height: 0.3rem;
        background-color: #2597c6;
        border-radius: 50%;
        z-index: 10000;
      }
    }
  }
`;

const StyledList = styled(List)`
  && {
    padding-top: 0;
  }
`;

const LevelOneItem = styled(ListItemButton)`
  && {
    &:hover {
      background-color: #dee7eb;
    }
  }
` as typeof ListItemButton;

const LevelTwoItem = styled(ListItemButton)`
  &&& {
    background-color: #ffffff;
    border-bottom: 1px solid #e4ebef;
    &:hover {
      background-color: #fafafa;
    }
    ${activeBullet}
  }
` as typeof ListItemButton;

const LevelThreeItem = styled(ListItemButton)`
  && {
    background-color: var(--grey);
    border-bottom: 1px solid #e4ebef;
    &:hover {
      background-color: var(--grey-hover);
    }
    ${activeBullet}
  }
` as typeof ListItemButton;
