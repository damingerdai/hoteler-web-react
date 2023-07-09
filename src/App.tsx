import * as React from 'react';
import { RouterProvider } from 'react-router-dom';
import Router from './Router';
import './App.scss';

const App: React.FC = () => (
  <RouterProvider router={Router} />
);

export default App;
