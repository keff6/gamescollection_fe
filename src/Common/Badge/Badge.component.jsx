import {Badge as BootstrapBadge} from 'react-bootstrap';
import proptypes from 'prop-types';
import { BADGE_TYPE } from '../../utils/constants'
import classes from './Badge.module.css'



const Badge = ({ type = BADGE_TYPE.NEW, isMini = false}) => {
  return (
      <BootstrapBadge pill bg="" className={`${classes.customPill} ${classes[type.toLowerCase().concat('Background')]}`}>
        {isMini ? BADGE_TYPE[type].miniLabel : BADGE_TYPE[type].label}
      </BootstrapBadge>
  );
}

Badge.propTypes = {
  type: proptypes.string,
  isMini: proptypes.bool,
}

export default Badge;