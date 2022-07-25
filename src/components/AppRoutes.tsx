import MatchGame from 'components/MatchGame/MatchGame';
import MatchMenu from 'components/MatchMenu/MatchMenu';
import { useMatchGame } from 'context/MatchGameContext';
import React from 'react';

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


      default: return <MatchMenu/>;
    }
  }

  return getRootComponent();

};

export default AppRoutes;
