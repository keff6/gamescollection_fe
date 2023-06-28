import { Breadcrumb as BootstrapBreadcrumb } from "react-bootstrap";
import proptypes from 'prop-types';


const Breadcrumb = ({ items }) =>
  <BootstrapBreadcrumb>
    {items.map((item, idx) =>
      <BootstrapBreadcrumb.Item
        key={idx}
        href={item.href}
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