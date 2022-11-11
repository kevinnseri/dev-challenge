import { Route, Routes, Navigate } from 'react-router-dom';
import React, { Fragment } from 'react';

import Login from '../app/screens/Login';
import Bands from '../app/screens/Bands';
import Band from '../app/screens/Band';

const AppRoutes = ({ profileAccess }) => {
  if (!profileAccess)
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );

  return (
    <Fragment>
      <Routes>
        <Route path="/bands" element={<Bands />} />
        <Route path="/band/:id/:name" element={<Band />} />
        <Route path="*" element={<Navigate to="/bands" replace />} />
      </Routes>
    </Fragment>
  );
};

export default AppRoutes;
