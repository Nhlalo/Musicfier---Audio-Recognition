import Styles from "./findconcert.module.css";
import { Calendar, Rows3, X } from "lucide-react";
import artistImg from "../../../../assets/artistImg.jpg";
import SidebarVisibility from "../sidebar/sidebar";
import { useState, useEffect, useRef } from "react";
import debounce from "../../../../utilis/debounce/debounce";
import { Sidebarby } from "../sidebar/sidebar";

//Custom hook that will make the body not be scrollable if the side bar is open
function useBodyScrollLock(isButtonPressed) {
  useEffect(() => {
    if (isButtonPressed) {
      document.body.classList.add("sidebarOpen");
    } else {
      document.body.classList.remove("sidebarOpen");
    }

    return () => {
      document.body.classList.remove("sidebarOpen");
    };
  }, [isButtonPressed]);
}

function FilterSidebarHeader({ showSidebar, sideBarVisible }) {
  function handleCloseModal() {
    showSidebar(false);
  }
  return (
    <>
      <div className={sideBarVisible ? Styles.filterConcerts : Styles.hidden}>
        <div className={Styles.headingContainer}>
          <h2 className={Styles.heading}>Filter Concerts</h2>
          <button
            type="button"
            className={Styles.hideBTN}
            aria-label="Close the side bar"
            onClick={handleCloseModal}
          >
            <X aria-hidden="true" />
          </button>
        </div>
      </div>
      {/* This will make the side bar be visible when the filter button is pressed */}
      <Sidebarby sideBarClassName="show" />
    </>
  );
}

function ArtistConcert({
  artist = "Drake",
  location = "Black River Park, Capetown",
  date = "Wednesday, December 31, 2025",
  genre = "HipHop",
  country = "South Africa",
}) {
  return (
    <a
      href="google.com"
      aria-label={`Purchase ticket for ${artist}'s concert on ${date} in ${location}`}
      className={Styles.concertLink}
    >
      <img
        src={artistImg}
        alt="Drake's image"
        loading="lazy"
        aria-hidden="true"
        className={Styles.artistImage}
      />
      <div aria-hidden="true" className={Styles.concertInfor}>
        <span className={Styles.date}>
          <Calendar className={Styles.calendarIcon} />
          {date}
        </span>
        <span className={Styles.artistName}>{artist}</span>
        <span className={Styles.location}>{location}</span>
        <span className={Styles.genre}>{genre}</span>
      </div>
    </a>
  );
}

export default function Concerts() {
  //This will aid in the tracking of the visibility of the concert filter side bar
  const [filterVisibility, setFilterVisibility] = useState(false);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useBodyScrollLock(filterVisibility);

  useEffect(() => {
    // Debounced resize handler
    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      /* If the user initial display the filter at a viewport less than 1024px(laptop) and expands the view port than decreases the viewport the viewport should be clear & clean thus making the filter disappear */
      if (windowSize.width >= 1024) {
        setFilterVisibility(false);
        console.log("The Boy");
      }
    }, 250);

    window.addEventListener("resize", handleResize);

    // Initial size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize.width]);

  //Will display the concert filter side bar when the filter button is pressed
  function handleShowFilter() {
    setFilterVisibility(true);
  }
  // This will pass the setFilterVisibility function to the sideBarFilter, so that it can be able to close the sidebar
  function passDataToChild(showSidebar) {
    setFilterVisibility(showSidebar);
  }

  const sidebarRef = useRef(null);
  return (
    <section className={Styles.allConcertsContainer}>
      {/* This will make the side bar be visible when the filter button is pressed */}
      {filterVisibility && (
        <FilterSidebarHeader
          showSidebar={passDataToChild}
          sideBarVisible={filterVisibility}
        />
      )}
      {/* This will automatically display the concert filter side bar when the viewport width is greater or equal to 1024px */}
      {windowSize.width >= 1024 && <SidebarVisibility />}

      <div className={Styles.allConcertsWrapper}>
        <h1 className={Styles.concertCountry}>
          Concerts in <span className={Styles.country}>South Africa</span>{" "}
        </h1>
        <p className={Styles.allConcertsDescr}>
          Find live music events in South Africa, get concert tickets, see tour
          dates and more.
        </p>
        <div className={Styles.searchFilterContainer}>
          <input
            type="text"
            name="concerts"
            className={Styles.concertInputSearch}
            placeholder="Artists or Bands"
            aria-label="Search for an artist's or a bands's concerts"
          />
          <button
            type="button"
            className={Styles.filterBTN}
            onClick={handleShowFilter}
          >
            <Rows3 className={Styles.filterIcon} aria-hidden="true" />
            <span className={Styles.filter}>Filter</span>
          </button>
        </div>
        {/* Concerts by the searched artists will dynamically appear here */}
        <div className={Styles.artistConcertContainer}>
          <ArtistConcert />
          <ArtistConcert />
          <ArtistConcert />
          <ArtistConcert />
          <ArtistConcert />
          <ArtistConcert />
          <ArtistConcert />
          <ArtistConcert />
          <ArtistConcert />
          <ArtistConcert />
          <ArtistConcert />
          <ArtistConcert />
          <ArtistConcert />
          <ArtistConcert />
          <ArtistConcert />
          <ArtistConcert />
          <ArtistConcert />
          <ArtistConcert />
          <ArtistConcert />
        </div>
      </div>
    </section>
  );
}
