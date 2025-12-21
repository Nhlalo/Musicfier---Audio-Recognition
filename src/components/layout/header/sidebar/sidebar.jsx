import Styles from "./sidebar.module.css";
import Logo from "../../../../assets/searchimage.png";
import { X } from "lucide-react";

const listItemKeys = {
  concerts: crypto.randomUUID(),
  charts: crypto.randomUUID(),
  mymusic: crypto.randomUUID(),
  contacts: crypto.randomUUID(),
};

export default function Sidebar() {
  const navLinksContent = [
    { content: "Concerts", key: listItemKeys.concerts },
    { content: "Charts", key: listItemKeys.charts },
    { content: "My Music", key: listItemKeys.mymusic },
    { content: "Contacts", key: listItemKeys.contacts },
  ];
  return (
    <div className={Styles.sideBar}>
      <div className={Styles.contentWrapper}>
        <div className={Styles.headerContainer}>
          <a className={Styles.logoContainer}>
            <div className={Styles.logoWrapper} aria-hidden="true">
              <img src={Logo} alt="Musicfier" className={Styles.logo} />
            </div>
            <figcaption className={Styles.websiteName} aria-hidden="true">
              MUSICFIER
            </figcaption>
          </a>
          <button aria-label="Close the side bar">
            <X className={Styles.closeIcon} aria-hidden="true" />
          </button>
        </div>
        <nav className={Styles.navContainer}>
          <ul className={Styles.listContainer}>
            {navLinksContent.map((element) => (
              <li className={Styles.navListItem} key={element.key}>
                <a href="" className={Styles.navlink}>
                  {element.content}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
