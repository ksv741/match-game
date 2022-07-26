import Button from 'components/UI/Button/Button';
import { MenuItem, useMatchGame } from 'context/MatchGameContext';
import React from 'react';

import cls from './MatchMenu.module.scss'

type GameMenuProps = {

}
type MenuItemType = {
  itemName: MenuItem;
  itemPlaceholder: string;
  condition?: () => boolean;
}

const MatchMenu: React.FC<GameMenuProps> = () => {
  const {setCurrentMenuItem} = useMatchGame();

  const menuItems: MenuItemType[] = [
    {itemName: 'continue-game', itemPlaceholder: 'Continue', condition: canContinueGame},
    {itemName: 'new-game', itemPlaceholder: 'New game'},
    {itemName: 'options', itemPlaceholder: 'Options'},
    {itemName: 'exit', itemPlaceholder: 'Exit'},
  ]

  function clickItemHandler(item: MenuItem) {
    setCurrentMenuItem?.(item);
    if (item === 'exit') {
      window.location = 'https://google.com' as any;
    }
  }

  function canContinueGame() {
    return !!localStorage.getItem('match-game:cards');
  }

  function renderItem(itemName: MenuItem, itemText: string) {
    return <Button className={cls.button} onClick={() => clickItemHandler(itemName)}>{itemText}</Button>
  }

  function renderMenuItems() {
    return menuItems.map(item => {
        return item?.condition
          ? item?.condition() && <li key={item.itemName}>{renderItem(item.itemName, item.itemPlaceholder)}</li>
          : <li key={item.itemName}>{renderItem(item.itemName, item.itemPlaceholder)}</li>;
    });
  }

  return (
    <div className={cls.MatchMenu}>
      <h2>Match game menu</h2>
      <ul>
        {renderMenuItems()}
      </ul>
    </div>
  );
};

export default MatchMenu;
