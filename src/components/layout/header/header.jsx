import React, { useState, useEffect } from "react";
import Logo from "../../../assets/searchimage.png";
import { Menu } from "lucide-react";
import Styles from "./header.module.css";
export default function Header({
  bg1,
  bg2,
  color1,
  color2,
  logoBG1,
  logoBG2,
  btnBG1,
  btnBG2,
}) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const navLinksContent = ["Concerts", "Charts", "My Music", "Contacts"];

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
  }, [scrollPosition]); //

  const headerConditionalstyles = {
    backgroundColor: scrollPosition > 0 ? bg1 : bg2,
    color: scrollPosition ? color1 : color2,
  };

  const navLinksConditionalStyles = {
    color: scrollPosition ? color1 : color2,
  };
  const logoBGConditionalStyles = {
    backgroundColor: scrollPosition > 0 ? logoBG1 : logoBG2,
  };

  const btnConditionalStyles = {
    backgroundColor: scrollPosition > 0 ? btnBG1 : btnBG2,
  };

  return (
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
              <li className={Styles.navListItem}>
                <a
                  href=""
                  className={Styles.navlink}
                  style={navLinksConditionalStyles}
                >
                  {element}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          aria-label="Open drop down menu"
          className={Styles.dropdownBTN}
          style={btnConditionalStyles}
        >
          <Menu className={Styles.dropdownMenu} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}

Header.defaultProps = {
  bg1: "#00bbff",
  bg2: "#fff;",
  color1: ": #fff;",
  color2: "#000000;",
  logoBG1: "#3b86f7",
  logoBG2: "#242424;",
  btnBG1: "#fff",
  btnBG2: "#0077ff",
};
