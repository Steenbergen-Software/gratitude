import { Link } from '@mui/material';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface FooterProps {
  isTransparent?: boolean;
}

export function Footer(props: FooterProps) {
  return (
    <Container isTransparent={props.isTransparent ?? false}>
      <p>
        © Copyright 2022. All rights reserved Steenbergen Software. <Link>Privacy Policy</Link> and <Link>Terms of Use</Link>
      </p>
    </Container>
  );
}

export default Footer;

const Container = styled.footer<{ isTransparent: boolean }>`
  display: flex;
  justify-content: end;
  align-items: center;

  color: ${({ isTransparent }) => (isTransparent ? '#d8d8d8' : '#3f4045')};
  background-color: ${({ isTransparent }) => (isTransparent ? 'transparent' : '#f5f5f5')};
  font-size: 0.75rem;
  height: 4rem;
  padding-right: 1rem;
`;
