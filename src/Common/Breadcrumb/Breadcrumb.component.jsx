import { Breadcrumb as BootstrapBreadcrumb, Button } from "react-bootstrap";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import proptypes from 'prop-types';
import ToolTip from '../Tooltip/Tooltip.component'
import classes from './Breadcrumb.module.css';

const Breadcrumb = ({ items, backButton = true }) => {
  const navigate = useNavigate();

  return (
  <div className={classes.breadcrumbExtended}>
    {backButton &&
    <ToolTip text="Go Back">
      <Button variant="link" className={classes.backButton} onClick={() => navigate(-1)}>
        <ArrowLeftCircle />
      </Button>
    </ToolTip>}
  <BootstrapBreadcrumb className={classes.breadcrumbContainer}>
    {items.map((item, idx) =>
      <BootstrapBreadcrumb.Item
        key={idx}
        linkAs={Link} linkProps={{ to: item.href }}
        active={item.active}
      >
        {item.text}
      </BootstrapBreadcrumb.Item>  
    )}
  </BootstrapBreadcrumb>
  </div>
  )
}

Breadcrumb.propTypes = {
  backButton: proptypes.bool,
  items: proptypes.array,
}

export default Breadcrumb