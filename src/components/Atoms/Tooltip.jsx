import React,{useState} from "react";
import { Tooltip } from "reactstrap";

const MyToolTip=({text,id})=>{
    const [tooltipOpen, setTooltipOpen] = useState(false)
    return (<Tooltip
        placement="top"
        isOpen={tooltipOpen}
        target={id}
        toggle={() => setTooltipOpen(!tooltipOpen)}
      >{text}</Tooltip>
      )
}
export default MyToolTip;