import React, { useState } from 'react';
import { Container } from 'reactstrap';
import { SignIn } from '../auth/SignIn';
import { NavMenu } from './NavMenu';

export function Layout({ username, onSignOut, children }) {
  return (
    <>
      <NavMenu username={username} onSignOut={onSignOut} />
      <Container>
        {children}
      </Container>
    </>
  );
}