import React, { useMemo } from 'react';
import cls from './Alerts.module.scss';

export type AlertProps = {
  success: boolean;
}

const Alert: React.FC<AlertProps> = (props) => {
  const classes = useMemo(() => {
    return props.success ? [cls.AlertMessage, cls.AlertMessageSuccess] : [cls.AlertMessage, cls.AlertMessageWrong];
  }, [props.success])

  return (
    <div className={cls.AlertWrapper}>
      <div className={classes.join(' ')}>
        {props.success ? <span>&#10004;</span> : <span>&#10008;</span>}
      </div>
    </div>
  );
};

export default Alert;
