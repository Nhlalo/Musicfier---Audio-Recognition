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
  lastFocusedElement,
}) {
  const sidebarRef = useRef(null);
  const logoLinkRef = useRef(null);
  const closeSideBarBTNRef = useRef(null);
  const concertsLinkRef = useRef(null);
  const chartsLinkRef = useRef(null);
  const myMusicLinkRef = useRef(null);
  const contactsLinkRef = useRef(null);

  //Array containing the content within the links and keys assigned to the list items
  const navLinksContent = [
    { content: "Concerts", key: listItemKeys.concerts, ref: concertsLinkRef },
    { content: "Charts", key: listItemKeys.charts, ref: chartsLinkRef },
    { content: "My Music", key: listItemKeys.mymusic, ref: myMusicLinkRef },
    { content: "Contacts", key: listItemKeys.contacts, ref: contactsLinkRef },
  ];

  //Close the side bar
  function closeSideBar() {
    const elementToRestore = lastFocusedElement.current;
    UpdateSidebarVisibility(false);

    //Ensures that the element is refocused after the state update
    requestAnimationFrame(() => {
      elementToRestore.focus();
    });
  }

  useEffect(() => {
    // Focus the logo link first
    logoLinkRef.current?.focus();
  }, []);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && sideBarStatus) {
        closeSideBar();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [sideBarStatus]); // ✅ closeModal is stable, no need in deps

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
          <a className={Styles.logoContainer} ref={logoLinkRef}>
            <div className={Styles.logoWrapper} aria-hidden="true">
              <img src={Logo} alt="Musicfier" className={Styles.logo} />
            </div>
            <figcaption className={Styles.websiteName} aria-hidden="true">
              MUSICFIER
            </figcaption>
          </a>
          <button
            aria-label="Close the side bar"
            onClick={closeSideBar}
            ref={closeSideBarBTNRef}
          >
            <X className={Styles.closeIcon} aria-hidden="true" />
          </button>
        </div>
        <nav className={Styles.navContainer}>
          <ul className={Styles.listContainer}>
            {navLinksContent.map((element) => (
              <li
                className={Styles.navListItem}
                key={element.key}
                ref={element.ref}
              >
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
