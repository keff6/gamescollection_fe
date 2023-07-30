import { InfoCircle } from "react-bootstrap-icons";
import proptypes from "prop-types";
import Tooltip from "../Tooltip/Tooltip.component";

const InfoTooltip = ({ infoText = "" }) => (
  <Tooltip text={infoText}>
    <InfoCircle /> 
  </Tooltip>
)

InfoTooltip.propTypes = {
  infoText: proptypes.string,
}

export default InfoTooltip;