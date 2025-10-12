import { OverlayTrigger, Tooltip as BSTooltip } from 'react-bootstrap';
import proptypes from "prop-types";

function Tooltip({ children, text, placement = "left" }) {
  const renderTooltip = (props) => (
    <BSTooltip id="button-tooltip" {...props}>
      {text}
    </BSTooltip>
  );

  return (
    <OverlayTrigger
      placement={placement}
      delay={{ show: 250, hide: 20 }}
      overlay={renderTooltip}
    >
      {children}
    </OverlayTrigger>
  );
}

Tooltip.propTypes = {
  children: proptypes.node,
  placement: proptypes.string,
  text: proptypes.string,
}

export default Tooltip;