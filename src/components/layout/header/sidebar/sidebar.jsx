import Styles from "./sidebar.module.css";
import Logo from "../../../../assets/searchimage.png";
import { X } from "lucide-react";
import { useRef, useEffect } from "react";

//Establish the keys for the list
const listItemKeys = {
  concerts: crypto.randomUUID(),
  charts: crypto.randomUUID(),
  mymusic: crypto.randomUUID(),
  contacts: crypto.randomUUID(),
};

export default function Sidebar({
  UpdateSidebarVisibility,
  sideBarStatus,
  sidebarData,
}) {
  //Array containing the content within the links and keys assigned to the list items
  const navLinksContent = [
    { content: "Concerts", key: listItemKeys.concerts },
    { content: "Charts", key: listItemKeys.charts },
    { content: "My Music", key: listItemKeys.mymusic },
    { content: "Contacts", key: listItemKeys.contacts },
  ];
  const sidebarRef = useRef(null);

  //Close the side bar
  function closeSideBar() {
    UpdateSidebarVisibility(false);
    sidebarRef.current.close();
  }

  useEffect(() => {
    //Send the sidebar object obtained using useRef to the header
    sidebarData(sidebarRef);
  }, [sidebarData]);

  return (
    <dialog
      className={
        sideBarStatus
          ? `${Styles.sideBar} ${Styles.openSidebar}`
          : Styles.sideBar
      }
      ref={sidebarRef}
    >
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
          <button aria-label="Close the side bar" onClick={closeSideBar}>
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
    </dialog>
  );
}
