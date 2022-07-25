import { MenuItem, useMatchGame } from 'context/MatchGameContext';
import React from 'react';

type GameMenuProps = {

}

const MatchMenu: React.FC<GameMenuProps> = () => {
  const {setCurrentMenuItem} = useMatchGame();

  function clickItemHandler(item: MenuItem) {
    setCurrentMenuItem?.(item);
  }

  function canContinueGame() {
    return !!localStorage.getItem('match-game:cards');
  }

  return (
    <div>
      <ul>
        {
          canContinueGame() ? <li onClick={() => clickItemHandler('continue-game')}>Continue</li> : null
        }
        <li onClick={() => clickItemHandler('new-game')}>New game</li>
        <li onClick={() => clickItemHandler('options')}>Options</li>
        <li onClick={() => clickItemHandler('exit')}>Exit</li>
      </ul>
    </div>
  );
};

export default MatchMenu;
