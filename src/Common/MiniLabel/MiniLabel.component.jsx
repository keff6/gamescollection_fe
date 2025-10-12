import proptypes from 'prop-types';
import classes from './MiniLabel.module.css';

const MiniLabel = ({labelText = '', children = null}) => {
    return (
      <div className={classes.miniLabel}>
        <label className={classes.miniLabelText}>{labelText}</label>
        {children}
      </div>
    )
  }

  MiniLabel.propTypes = {
    labelText: proptypes.string,
    children: proptypes.node,
  }

  export default MiniLabel;