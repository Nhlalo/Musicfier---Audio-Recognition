import Logo from "../../../assets/searchimage.png";
import { Menu } from "lucide-react";
import Styles from "./header.module.css";
export default function Header() {
  return (
    <header className={Styles.header}>
      <div className={Styles.navContentWrapper}>
        <a className={Styles.logoContainer}>
          <img src={Logo} alt="Musicfier" className={Styles.logo} />
          <figcaption className={Styles.websiteName}>MUSICFIER</figcaption>
        </a>
        <nav className={Styles.navContainer}>
          <ul className={Styles.listContainer}>
            <li className={Styles.navListItem}>
              <a href="" className={Styles.navlink}>
                Concerts
              </a>
            </li>
            <li className={Styles.navListItem}>
              <a href="" className={Styles.navlink}>
                Charts
              </a>
            </li>
            <li className={Styles.navListItem}>
              <a href="" className={Styles.navlink}>
                My Music
              </a>
            </li>
            <li className={Styles.navListItem}>
              <a href="" className={Styles.navlink}>
                Contacts
              </a>
            </li>
          </ul>
        </nav>
        <Menu className={Styles.dropdownMenu} aria-label="Drop down menu" />
      </div>
    </header>
  );
}
