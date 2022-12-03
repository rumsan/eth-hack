import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import PropTypes from "prop-types";

function Example({ direction, onClickLogout, ...args }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
      <DropdownToggle id="wallet-dropdown">
        <i
          className="ri-notification-2-line text-white"
          style={{ fontSize: 20 }}
        ></i>
      </DropdownToggle>
      <DropdownMenu {...args}>
        <DropdownItem onClick={() => onClickLogout()}>Log Out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

Example.propTypes = {
  direction: PropTypes.string,
};

export default Example;
