import { useCallback, useState } from 'react';
import { Box, Button, Link, Modal, Typography } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import { Signup } from './signup/signup';

/* eslint-disable-next-line */
export interface GuestProps {}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function Guest(props: GuestProps) {
  const { login } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignupSuccess = useCallback(() => {
    setOpen(false);
    navigate('/signup-complete');
  }, [navigate]);

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
        <Link onClick={() => setOpen(true) }>
          Sign Up
        </Link>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Signup onSignupComplete={handleSignupSuccess}></Signup>
          </Box>
        </Modal>
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
