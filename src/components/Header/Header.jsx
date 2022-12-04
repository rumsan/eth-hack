import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import "./header.css";
import { Container } from "reactstrap";
import * as PushAPI from "@pushprotocol/restapi";

import { NavLink, Link } from "react-router-dom";

import { useWeb3React } from "@web3-react/core";
import { AppContext } from "../../modules/app/context";
import WalletDropDown from "../Atoms/WalletDropdown";
import NotificationDropdown from "../Atoms/NotificationDropdown";

const NAV__LINKS = [
  {
    display: "Home",
    url: "/home",
  },
  {
    display: "Market",
    url: "/market",
  },
  {
    display: "Create",
    url: "/create",
  },
  { display: "My Collections", url: "/my-collections" },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [notification, setNotification] = useState([]);
  const { account } = useWeb3React();
  const { connectMetaMask, disconnect } = useContext(AppContext);

  const handleConnectWallet = useCallback(
    async (status) => {
      connectMetaMask();
    },
    [connectMetaMask]
  );

  const getNotifications = useCallback(async () => {
    try {
      if (!account) return;
      const notifications = await PushAPI.user.getFeeds({
        user: `eip155:5:0x3e63Fc89c0DE2Fc4ae6a6cD3ea2634947204919D`, //${account}`, // user address in CAIP
        spam: true,
        env: "staging",
      });
      setNotification(notifications);
    } catch (e) {
      console.log(e);
    }
  }, [account]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    });

    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const toggleMenu = () => menuRef.current.classList.toggle("active__menu");
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="navigation">
          <div className="logo">
            <h2 className=" d-flex gap-2 align-items-center ">
              <span>
                <i className="ri-fire-fill"></i>
              </span>
              <Link to="/" style={{ textDecoration: "none" }}>
                {" "}
                Ease NFTs
              </Link>
            </h2>
          </div>

          <div className="nav__menu" ref={menuRef} onClick={toggleMenu}>
            <ul className="nav__list">
              {NAV__LINKS.map((item, index) => (
                <li className="nav__item" key={index}>
                  <NavLink
                    to={item.url}
                    className={(navClass) =>
                      navClass.isActive ? "active" : ""
                    }
                  >
                    {!account && index === 3 ? null : item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav__right d-flex align-items-center  gap-3">
            <button className="btn d-flex gap-2 align-items-center">
              <span>
                <i className="ri-wallet-line"></i>
              </span>
              <Link onClick={handleConnectWallet}>
                {account ? account : "Connect Wallet"}
              </Link>
              {account && (
                <WalletDropDown
                  onClickLogout={() => disconnect()}
                  direction="down"
                />
              )}
              {account && (
                <NotificationDropdown
                  direction="down"
                  notifications={notification}
                  // msgs={getNotifications()}
                />
              )}
            </button>

            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
