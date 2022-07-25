import AppRoutes from 'components/AppRoutes';
import { MatchGameProvider } from 'context/MatchGameContext';
import React from 'react';
import cls from './App.module.scss';

function App() {
  return (
    <div className={cls.App}>
      <MatchGameProvider>
        <AppRoutes/>
      </MatchGameProvider>
    </div>
  );
}

export default App;
