import { Breadcrumb as BootstrapBreadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import proptypes from 'prop-types';
import classes from './Breadcrumb.module.css';

const Breadcrumb = ({ items }) =>
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

Breadcrumb.propTypes = {
  items: proptypes.array,
}

export default Breadcrumb