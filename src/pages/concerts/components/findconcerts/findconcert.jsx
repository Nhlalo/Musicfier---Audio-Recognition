import Styles from "./findconcert.module.css";
import { Calendar, Rows3 } from "lucide-react";
import artistImg from "../../../../assets/artistImg.jpg";
import SidebarVisibility from "../sidebar/sidebar";
import { useState, useEffect } from "react";

//This is a debounce function to help optimization the tracking of the viewport width
function debounce(func, wait) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), wait);
  };
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
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Debounced resize handler
    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 250);

    window.addEventListener("resize", handleResize);

    // Initial size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [filterVisibility, setFilterVisibility] = useState(false);
  function handleShowFilter() {
    setFilterVisibility(true);
  }

  return (
    <section className={Styles.allConcertsContainer}>
      {/* This will make the side bar be visible when the filter button is pressed */}
      {filterVisibility && <SidebarVisibility />}
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
        {/* Concerts by the searched artists will appear here */}
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
