import { Button, TextField, Typography } from '@mui/material';
import { useWebRequest } from '../../../../hooks/use-web-request';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface SignupProps {
  onSignupComplete: () => void;
}

export function Signup({ onSignupComplete }: SignupProps) {

  const [createUser, setCreateUser] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
  });

  const { loading, error, success, exec } = useWebRequest('/config/config.json', 'POST');

  useEffect(() => {
    if (success) {
      onSignupComplete();
    }
  }, [success, onSignupComplete])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateUser({
      ...createUser,
      [name]: value,
    });
  };

  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        DeveloperPortalSAML
      </Typography>

      <Typography color={error ? 'error' : 'textPrimary'}>
        {error?.message || 'Please fill out the form below.'}
      </Typography>
      <TextField
        id="name-input"
        name="name"
        label="Your Full Name"
        type="text"
        fullWidth
        value={createUser.name}
        onChange={handleInputChange}
      />
      <TextField
        id="email-input"
        name="email"
        label="Email Address"
        type="text"
        fullWidth
        value={createUser.email}
        onChange={handleInputChange}
      />
      <TextField
        id="subject-input"
        name="subject"
        label="Subject"
        type="text"
        fullWidth
        value={createUser.subject}
        onChange={handleInputChange}
      />
      <TextField
        id="message-input"
        name="message"
        label="Message"
        type="text"
        fullWidth
        multiline
        minRows={4}
        maxRows={6}
        value={createUser.message}
        onChange={handleInputChange}
      />

      <br />
      <Button onClick={() => exec(createUser)} disabled={loading}>
        SUBMIT
      </Button>
    </>
  );
}

export default Signup;
