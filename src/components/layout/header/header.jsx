import React, { useState, useEffect } from "react";
import Logo from "../../../assets/searchimage.png";
import { Menu } from "lucide-react";
import Styles from "./header.module.css";
export default function Header(bg1, bg2, color1, color2) {
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

  return (
    <header className={Styles.header} style={headerConditionalstyles}>
      <div className={Styles.navContentWrapper}>
        <a className={Styles.logoContainer}>
          <img src={Logo} alt="Musicfier" className={Styles.logo} />
          <figcaption className={Styles.websiteName}>MUSICFIER</figcaption>
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
        <Menu className={Styles.dropdownMenu} aria-label="Drop down menu" />
      </div>
    </header>
  );
}
