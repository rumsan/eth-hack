import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "reactstrap";
import PropTypes from "prop-types";

function Example({ direction, onClickLogout, ...args }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(true);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const toggleBadge = () => {
    setShowBadge(false);
  };

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
      <DropdownToggle id="wallet-dropdown" onClick={toggleBadge}>
        <i
          className="ri-notification-2-line text-white"
          style={{ fontSize: 20 }}
        ></i>
        {showBadge && <Badge color="success">1</Badge>}
      </DropdownToggle>
      <DropdownMenu {...args}>
        <DropdownItem>notification 1</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

Example.propTypes = {
  direction: PropTypes.string,
};

export default Example;
