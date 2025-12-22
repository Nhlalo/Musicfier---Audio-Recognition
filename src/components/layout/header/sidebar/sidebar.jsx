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
    logoLinkRef.current.focus();

    // Escape key handler
    const handleEscape = (e) => {
      if (e.key === "Escape" && sideBarStatus) {
        closeSideBar();
      }
    };

    //Trap focus within the side bar
    const handleTabKey = (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const focusableElements = [
          logoLinkRef.current,
          closeSideBarBTNRef.current,
          concertsLinkRef.current,
          chartsLinkRef.current,
          myMusicLinkRef.current,
          contactsLinkRef.current,
        ];

        if (focusableElements.length) {
          const first = focusableElements[0];
          const last = focusableElements[focusableElements.length - 1];

          // TRAP LOGIC

          //Locate the position of the focused element within focusableElement array
          const currentIndex = focusableElements.indexOf(
            document.activeElement,
          );

          let nextIndex;

          if (e.shiftKey) {
            // Shift + Tab
            if (currentIndex == 0) {
              nextIndex = focusableElements.length - 1; // Loop to last
            } else {
              nextIndex = currentIndex - 1;
            }
          } else {
            // Tab only
            if (currentIndex == focusableElements.length - 1) {
              nextIndex = 0; // Loop to first
            } else {
              nextIndex = currentIndex + 1;
            }
          }

          focusableElements[nextIndex].focus();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleTabKey);

    //cleanup - remove the event listener to prevent memory leak
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTabKey);
    };
  }, [sideBarStatus]); //

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
          <a
            className={Styles.logoContainer}
            ref={logoLinkRef}
            href="google.com"
          >
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
              <li className={Styles.navListItem} key={element.key}>
                <a
                  href="google.com"
                  className={Styles.navlink}
                  ref={element.ref}
                >
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
