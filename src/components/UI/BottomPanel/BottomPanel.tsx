import React from 'react';

import cls from './BottomPanel.module.scss';

type BottomPanelProps = {}

const BottomPanel: React.FC<BottomPanelProps> = ({children}) => {
  return (
    <div className={cls.BottomPanel}>
      { children }
    </div>
  );
};

export default BottomPanel;
