import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Pages/App';
import Equipos from './Pages/Equipos';
import Equipo from './Pages/Equipo';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="equipos" element={<Equipos />}>
        <Route path=":idEquipo" element={<Equipo />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
