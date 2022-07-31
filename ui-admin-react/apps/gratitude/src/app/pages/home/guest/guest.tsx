import { Button, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../../hooks';

/* eslint-disable-next-line */
export interface GuestProps {}

export function Guest(props: GuestProps) {
  const { login } = useAuth();

  return (
    <Container>
      <StyledP>
        Get access to Arturo’s
        <br /> <strong>API Docs, Data Dictionaries</strong>
        <br /> <strong>FAQ’s</strong> and more
      </StyledP>
      <Button onClick={() => login()} variant="large">
        Login
      </Button>
      <Typography>
        Need to create an account?{' '}
        <Link component={RouterLink} to="/signup">
          Sign Up
        </Link>
      </Typography>
    </Container>
  );
}

export default Guest;

const Container = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 10rem 5rem 1rem 5rem;
  color: #ffffff;
`;

const StyledP = styled.p`
  margin: 0;
  letter-spacing: 1.58px;
  font-weight: 300;
  font-size: 4rem;
  line-height: 5rem;
`;
