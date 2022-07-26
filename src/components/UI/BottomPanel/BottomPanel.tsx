import React from 'react';

import cls from './BottomPanel.module.scss';

type BottomPanelProps = {
  style?: React.CSSProperties;
}

const BottomPanel: React.FC<BottomPanelProps> = ({children, style}) => {
  return (
    <div className={cls.BottomPanel} style={style}>
      { children }
    </div>
  );
};

export default BottomPanel;
