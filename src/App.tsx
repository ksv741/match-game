import React from 'react';
import cls from './App.module.scss';
import MatchGame from './components/MatchGame/MatchGame';
import { MatchGameProvider } from './context/MatchGameContext';

function App() {
  return (
    <div className={cls.App}>
      <MatchGameProvider>
        <MatchGame/>
      </MatchGameProvider>
    </div>
  );
}

export default App;
