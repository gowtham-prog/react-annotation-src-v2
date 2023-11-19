import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes

import styled from 'styled-components';

import NavBar from './components/NavBar';
import Root from './components/Root';
import Home from './components/Home';
import Docs from './components/Docs';
import Footer from './components/Footer';
import Multiple from './components/Samples/Multiple';

const Main = styled.main`
  margin: 0 16px;
  margin-top: 51px;
`;

export default () => (
  <Router>
    <Root>
      <NavBar title='react-image-annotation' />
      <Main>
        <Routes> {/* Wrap your routes in a Routes element */}
          <Route path='/' element={<Home />} /> {/* Use the 'element' prop */}
          <Route path='/docs' element={<Docs />} /> {/* Use the 'element' prop */}
        </Routes>
      </Main>
      <Footer />
    </Root>
  </Router>
);