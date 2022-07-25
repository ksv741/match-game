import MatchGame from 'components/../pages/MatchGame/MatchGame';
import MatchMenu from 'components/../pages/MatchMenu/MatchMenu';
import { useMatchGame } from 'context/MatchGameContext';
import React from 'react';
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
