import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "reactstrap";
import PropTypes from "prop-types";

function NotificationDropdown({ direction, notifications, msgs, ...args }) {
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
        {showBadge && (
          <Badge color="success">
            {notifications && notifications.length ? notifications.length : 0}
          </Badge>
        )}
      </DropdownToggle>
      <DropdownMenu {...args}>
        {notifications &&
          notifications.map((el, index) => (
            <DropdownItem
              key={index}
              className="notification justify-content-center "
            >
              <i className="ri-information-fill" style={{ fontSize: 16 }}></i>{" "}
              <span style={{ marginTop: 20 }}>{el?.message}</span>
            </DropdownItem>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
}

NotificationDropdown.propTypes = {
  direction: PropTypes.string,
};

export default NotificationDropdown;
