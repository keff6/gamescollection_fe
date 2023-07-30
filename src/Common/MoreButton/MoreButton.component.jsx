import { forwardRef } from "react";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import proptypes from "prop-types";

const MoreButton = forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <ThreeDotsVertical />
  </a>
));

MoreButton.displayName = "More";

MoreButton.propTypes = {
  children: proptypes.node,
  onClick: proptypes.func,
}

export default MoreButton