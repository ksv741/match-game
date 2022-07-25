import { useMatchGame } from 'context/MatchGameContext';
import MatchMenu from 'pages/MatchMenu/MatchMenu';
import React from 'react';
import MatchGame from 'pages/MatchGame/MatchGame';
import Options from 'src/pages/Options/Options';

const AppRoutes = () => {
  const {currentMenuItem} = useMatchGame();

  function getRootComponent () {
    switch (currentMenuItem) {
      case 'menu':
        return <MatchMenu/>;

      case 'continue-game':
        return <MatchGame isNewGame={false}/>;

      case 'new-game':
        return <MatchGame isNewGame={true}/>;

      case 'options':
        return <Options/>


      default: return <MatchMenu/>;
    }
  }

  return getRootComponent();

};

export default AppRoutes;
