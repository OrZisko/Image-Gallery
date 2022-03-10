import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import './assets/style/main.scss'

import { AppHeader } from "./cmps/AppHeader";
import { Home } from './pages/Home';

export function App() {
  return (
    <div id="app">
      <AppHeader></AppHeader>
      <main className='app-container'>
        <Home></Home>
      </main>
    </div>
  );
}

