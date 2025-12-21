import React, { useState, useEffect } from "react";
import Logo from "../../../assets/searchimage.png";
import { Menu } from "lucide-react";
import Styles from "./header.module.css";
import Sidebar from "./sidebar/sidebar";

const listItemKeys = {
  concerts: crypto.randomUUID(),
  charts: crypto.randomUUID(),
  mymusic: crypto.randomUUID(),
  contacts: crypto.randomUUID(),
};

export default function Header({
  bg1 = "#00bbff",
  bg2 = "#fff",
  color1 = "#fff",
  color2 = "#000000",
  logoBG1 = "#3b86f7",
  logoBG2 = "#242424",
  btnBG1 = "#fff",
  btnBG2 = "#0077ff",
}) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);
  const navLinksContent = [
    { content: "Concerts", key: listItemKeys.concerts },
    { content: "Charts", key: listItemKeys.charts },
    { content: "My Music", key: listItemKeys.mymusic },
    { content: "Contacts", key: listItemKeys.contacts },
  ];

  useEffect(() => {
    // This is acceptable because we properly clean up
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    // Use passive for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Proper cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); //

  const headerConditionalstyles = {
    backgroundColor: scrollPosition == 0 ? bg1 : bg2,
    color: scrollPosition == 0 ? color1 : color2,
  };

  const navLinksConditionalStyles = {
    color: scrollPosition == 0 ? color1 : color2,
  };
  const logoBGConditionalStyles = {
    backgroundColor: scrollPosition == 0 ? logoBG1 : logoBG2,
  };

  const dropdownMenuConditionalStyles = {
    color: scrollPosition == 0 ? btnBG1 : btnBG2,
  };
  function handleOpeningSidebar() {
    setShowSidebar(true);
  }

  function handleSidebarDisplay(value) {
    setShowSidebar(value);
  }

  return (
    <>
      <header className={Styles.header} style={headerConditionalstyles}>
        <div className={Styles.navContentWrapper}>
          <a className={Styles.logoContainer}>
            <div
              className={Styles.logoWrapper}
              style={logoBGConditionalStyles}
              aria-hidden="true"
            >
              <img src={Logo} alt="Musicfier" className={Styles.logo} />
            </div>
            <figcaption className={Styles.websiteName} aria-hidden="true">
              MUSICFIER
            </figcaption>
          </a>
          <nav className={Styles.navContainer}>
            <ul className={Styles.listContainer}>
              {navLinksContent.map((element) => (
                <li className={Styles.navListItem} key={element.key}>
                  <a
                    href=""
                    className={Styles.navlink}
                    style={navLinksConditionalStyles}
                  >
                    {element.content}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            aria-label="Open drop down menu"
            className={Styles.dropdownBTN}
            onClick={handleOpeningSidebar}
          >
            <Menu
              className={Styles.dropdownMenu}
              aria-hidden="true"
              style={dropdownMenuConditionalStyles}
            />
          </button>
        </div>
      </header>
      <Sidebar
        UpdateSidebarVisibility={handleSidebarDisplay}
        sideBarStatus={showSidebar}
      />
    </>
  );
}
