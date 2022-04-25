import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Products } from './components/Product/Products';
import { Customers } from './components/Customer/Customers';
import { SignIn } from './auth/SignIn';
import { SignUp } from './auth/SignUp';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandler } from './ErrorHandler';
import { Error403 } from './components/errors/403';
import { UnexpectedError } from './components/errors/UnexpectedError';
import { ChangeSettings } from './account/ChangeSettings';
import { Spinner } from 'react-bootstrap';
import './custom.css';

export default function App() {
  const [userAuthName, setUserAuthName] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkAuth = async () => {
    setLoading(true);

    const response = await fetch("api/auth");
    const data = await response.json();
    if (data["isAuth"]) {
      setUserAuthName(data["username"]);
    }

    setLoading(false);
  }

  const onSignOut = () => {
    setUserAuthName(null);
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Layout username={userAuthName} onSignOut={onSignOut}>
      <ErrorBoundary FallbackComponent={ErrorHandler}>
        {!loading ?
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/settings' element={<ChangeSettings username={userAuthName} />} />
            <Route path='/signin' element={<SignIn isAuth={!!userAuthName} setUserAuthName={setUserAuthName} />} />
            <Route path='/signup' element={<SignUp isAuth={!!userAuthName} setUserAuthName={setUserAuthName} />} />
            <Route path='/403' element={<Error403 />} />
            <Route path='/error' element={<UnexpectedError />} />
            <Route path='*' element={<h1>Not Found</h1>} />
          </Routes>
          : <Spinner animation="border" role="status" />}
      </ErrorBoundary>
    </Layout>
  );
}
