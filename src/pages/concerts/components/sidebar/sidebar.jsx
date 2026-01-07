import Styles from "./sidebar.module.css";
import {
  ChevronDown,
  ChevronUp,
  MapPinCheck,
  Calendar,
  X,
  Search,
} from "lucide-react";
import { useState, useEffect, useRef, forwardRef } from "react";
import {
  openDialog,
  closeDialog,
  displayModal,
} from "../../../../utilis/side bar/sidebar";
import debounce from "../../../../utilis/debounce/debounce";
import getFocusableElements from "../../../../utilis/focusableElements/focusableelements";
import {
  getTodayDate,
  getTomorrowDate,
  getDayAfterTomorrowDate,
  getThisWeekendDates,
} from "../../../../utilis/date/date";
import { Location } from "../../../../hooks/locationSearching/locationsearch";
/* Deal with focusable Elements, place in an array*/
function Duration({
  firstDate,
  lastDate,
  customRangeClassName,
  valueConcertDurationVisibility,
  startDateRef,
  endDateRef,
}) {
  return (
    <div className={customRangeClassName}>
      <div className={Styles.startDateContainer}>
        <label htmlFor="startDate" className={Styles.start}>
          Starts
        </label>
        <input
          type="date"
          id="startDate"
          name="start_date"
          className={Styles.startDate}
          value={firstDate}
          ref={startDateRef}
          disabled={(valueConcertDurationVisibility = "show" ? false : true)}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className={Styles.endDateContainer}>
        <label htmlFor="endDate" className={Styles.end}>
          Ends
        </label>
        <input
          type="date"
          id="endDate"
          name="end_date"
          className={Styles.endDate}
          value={lastDate}
          ref={endDateRef}
          disabled={valueConcertDurationVisibility == "show" ? false : true}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
}
const Sidebarby = forwardRef(function (props, ref) {
  // Destructure from props
  const { location = "South Africa", sideBarClassName } = props;

  const todayDateRef = useRef(getTodayDate());
  const tomorrowDateRef = useRef(getTomorrowDate());
  const dayAfterTomorrowRef = useRef(getDayAfterTomorrowDate());
  const fridayRef = useRef(getThisWeekendDates().start);
  const sundayRef = useRef(getThisWeekendDates().end);
  const searchInputBTNRef = useRef(null);
  const todayBTNRef = useRef(null);
  const tomorrowBTNRef = useRef(null);
  const weekendBTNRef = useRef(null);
  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);

  const upcomingInputRef = useRef(null);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  //Determine the visibility of the custom range concert duaration
  const [concertDurationVisibility, setConcertDurationVisibility] =
    useState("hide");

  //Determine the visibility of the location input search
  const [locationSearchVisibility, setLocationSearchVisibility] =
    useState("hide");

  //Determine if the recent location searches are cleared
  const [clearLocation, setClearLocation] = useState(false);

  const [upcomingStatus, setUpcomingStatus] = useState(true);

  const [todayStatus, setTodayStatus] = useState(false);

  const [tomorrowStatus, setTomorrowStatus] = useState(false);

  const [weekendStatus, setWeekendStatus] = useState(false);

  const [startDate, setStartDate] = useState(todayDateRef.current);
  const [endDate, setEndDate] = useState(tomorrowDateRef.current);

  //This will ensure  that the location searching state data, loading and error is displayed
  const [displayLocationData, setDisplayLocationData] = useState(false);
  const [inputChange, setInputChange] = useState("");

  const greaterthan1024 = windowSize.width >= 1024; //Equal or greater than 768px viewport width return true

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

  //Display the concert duration
  function handleShowCustomDurationVisibility() {
    setConcertDurationVisibility("show");
  }

  //Hide the concert duration
  function handleHideCustomDurationVisibility() {
    setConcertDurationVisibility("hide");
  }

  //show the location search duration
  function handleShowLocationSearch() {
    setLocationSearchVisibility("show");
  }
  //Hide the location search duration
  function handleHideLocationSearch() {
    setLocationSearchVisibility("hide");
    searchInputBTNRef.current.value = "";
    setDisplayLocationData(false);
    searchInputBTNRef.current.value = "";
    setInputChange("");
  }

  //Clear the recent location search
  function handleClearLocation() {
    setClearLocation(true);
  }

  //This will which of four buttons is clicked
  function updateConcertDurationBTNs(upcoming, today, tommorrow, weekend) {
    setUpcomingStatus(upcoming);
    setTodayStatus(today);
    setTomorrowStatus(tommorrow);
    setWeekendStatus(weekend);
  }
  function handleToday() {
    setStartDate(todayDateRef.current);
    setEndDate(tomorrowDateRef.current);
    updateConcertDurationBTNs(false, true, false, false);
  }
  function handleTomorrow() {
    setStartDate(tomorrowDateRef.current);
    setEndDate(dayAfterTomorrowRef.current);
    updateConcertDurationBTNs(false, false, true, false);
  }
  function handleWeekend() {
    setStartDate(fridayRef.current);
    setEndDate(sundayRef.current);

    updateConcertDurationBTNs(false, false, false, true);
  }
  function handleUpcoming() {
    setStartDate(todayDateRef.current);
    setEndDate(tomorrowDateRef.current);
    updateConcertDurationBTNs(true, false, false, false);
  }
  const handleLocationSearch = debounce(() => {
    const inputValue = searchInputBTNRef.current.value;

    //Display if the input value is not empty or only contains one character or is only filled with white spaces
    if (inputValue.trim().length > 1) {
      setDisplayLocationData(true);
      setInputChange(inputValue);
    } else {
      setDisplayLocationData(false);
    }
  }, 250);

  return (
    <>
      <div className={Styles.backdrop}></div>
      <dialog
        className={
          greaterthan1024
            ? `${Styles.filterConcerts} ${Styles.sidebarContainer}`
            : `${Styles.filterConcerts} ${Styles.sidebarContainer} ${Styles[sideBarClassName]}`
        }
        ref={ref}
      >
        <div className={Styles.whenContainer}>
          <span className={Styles.visuallyHidden}>
            Select the date of the concerts
          </span>
          <h3 className={Styles.when} aria-hidden="true">
            When?
          </h3>
          <div className={Styles.concertDate}>
            <div className={Styles.todayContainer}>
              <button
                type="button"
                className={
                  upcomingStatus
                    ? ` ${Styles.BTNs} ${Styles.blue}`
                    : ` ${Styles.BTNs}`
                }
                ref={upcomingInputRef}
                onClick={handleUpcoming}
              >
                All Upcoming
              </button>
              <button
                type="button"
                className={
                  todayStatus
                    ? `${Styles.BTNs} ${Styles.blue} `
                    : `${Styles.BTNs}`
                }
                ref={todayBTNRef}
                onClick={handleToday}
              >
                Today
              </button>
            </div>
            <div className={Styles.tomorrowContainer}>
              <button
                type="button"
                className={
                  tomorrowStatus
                    ? ` ${Styles.BTNs} ${Styles.blue}`
                    : ` ${Styles.BTNs}`
                }
                ref={tomorrowBTNRef}
                onClick={handleTomorrow}
              >
                Tomorrow
              </button>
              <button
                type="button"
                className={
                  weekendStatus
                    ? `${Styles.BTNs} ${Styles.blue}`
                    : `${Styles.BTNs}`
                }
                ref={weekendBTNRef}
                onClick={handleWeekend}
              >
                This Weekend
              </button>
            </div>
          </div>
          <button
            type="button"
            className={Styles.customRangeBTN}
            onClick={
              concertDurationVisibility == "hide"
                ? handleShowCustomDurationVisibility
                : handleHideCustomDurationVisibility
            }
          >
            <Calendar aria-hidden="true" />{" "}
            <span className={Styles.customRange}>Custom Range</span>{" "}
            {concertDurationVisibility == "hide" ? (
              <ChevronDown aria-hidden="true" />
            ) : (
              <ChevronUp aria-hidden="true" />
            )}
          </button>
          <Duration
            firstDate={startDate}
            lastDate={endDate}
            customRangeClassName={
              concertDurationVisibility == "show"
                ? Styles.dateContainer
                : Styles.noVisibility
            }
            valueConcertDurationVisibility={concertDurationVisibility}
            startDateRef={startDateInputRef}
            endDateRef={endDateInputRef}
          />
        </div>
        <div className={Styles.whereContainer}>
          <div>
            <div className={Styles.clearContainer}>
              <h3 className={Styles.visuallyHidden}>
                Select the locatiion of the concerts
              </h3>
              <h3 className={Styles.where} aria-hidden="true">
                Where?
              </h3>
              <button
                type="button"
                className={Styles.clearBTN}
                onClick={handleClearLocation}
              >
                clear
              </button>
            </div>
          </div>
          <div className={Styles.concertLocationContainer}>
            <div className={Styles.nearMeContainer}>
              <button
                type="button"
                className={`${Styles.nearMe} ${Styles.BTNs}`}
              >
                Near Me
              </button>
              <button
                type="button"
                className={
                  clearLocation
                    ? Styles.noVisibility
                    : `${Styles.usa} ${Styles.BTNs}`
                }
              >
                USA
              </button>
            </div>
            <div
              className={
                clearLocation ? Styles.noVisibility : Styles.locationContainer
              }
            >
              <button
                type="button"
                className={`${Styles.australia} ${Styles.BTNs}`}
              >
                Australia
              </button>
              <button
                type="button"
                className={`${Styles.location} ${Styles.BTNs}`}
              >
                {location}
              </button>
            </div>
          </div>
          <button
            type="button"
            className={Styles.newLocationBTN}
            onClick={
              locationSearchVisibility == "hide"
                ? handleShowLocationSearch
                : handleHideLocationSearch
            }
          >
            <MapPinCheck aria-hidden="true" />
            <span className={Styles.newLocation}>New Location</span>{" "}
            {locationSearchVisibility == "hide" ? (
              <ChevronDown aria-hidden="true" />
            ) : (
              <ChevronUp aria-hidden="true" />
            )}
          </button>
          <div
            className={
              locationSearchVisibility == "show"
                ? Styles.countryInputContainer
                : Styles.noVisibility
            }
          >
            <Search className={Styles.searchIcon} />
            <input
              type="text"
              name="country"
              className={Styles.countryInput}
              ref={searchInputBTNRef}
              disabled={locationSearchVisibility == "show" ? false : true}
              onChange={handleLocationSearch}
            />
          </div>
          {displayLocationData && <Location characterChange={inputChange} />}
        </div>
      </dialog>
    </>
  );
});
export default function SidebarVisibility() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [visibleButton, setVisibleButton] = useState("show");
  const sidebarContainerRef = useRef(null);
  const sidebarRef = useRef(null);
  const showBTNRef = useRef(null);
  const previousFocusedElement = useRef(null);
  const lessthan768 = windowSize.width <= 768; //Equal or less than 768px viewport width return true

  //Track viewport width
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

  const handleCloseModal = function () {
    const sideBarContainerValue = sidebarContainerRef.current;
    const sideBarvalue = sidebarRef.current;
    closeDialog(
      sideBarvalue,
      getFocusableElements(sideBarContainerValue),
      previousFocusedElement.current,
    );
    setVisibleButton("show");
  };

  const handleOpenModal = function () {
    previousFocusedElement.current = document.activeElement;
    const sideBarvalue = sidebarRef.current;

    openDialog(sideBarvalue);
    setVisibleButton("hide");
  };

  //This will ensure that the focusable elements are collected after the show button is disabled and the hide button is visible
  useEffect(() => {
    const sideBarContainerValue = sidebarContainerRef.current;
    if (visibleButton == "hide") {
      displayModal(
        sideBarContainerValue,
        getFocusableElements(sideBarContainerValue),
      );
    }
  }, [visibleButton]);

  return (
    <div ref={sidebarContainerRef}>
      <div
        className={lessthan768 ? Styles.noVisibility : Styles.filterConcerts}
      >
        <div className={Styles.headingContainer}>
          <h2 className={Styles.heading}>Filter Concerts</h2>
          <button
            type="button"
            className={
              visibleButton == "show" ? Styles.showBTN : Styles.noVisibility
            }
            aria-label="Open the side bar"
            onClick={handleOpenModal}
            disabled={visibleButton == "hide" ? true : false}
          >
            show
          </button>
          <button
            type="button"
            className={
              visibleButton == "hide" ? Styles.hideBTN : Styles.noVisibility
            }
            aria-label="Close the side bar"
            onClick={handleCloseModal}
            ref={showBTNRef}
          >
            <X aria-hidden="true" />
          </button>
        </div>
      </div>
      <Sidebarby ref={sidebarRef} />
    </div>
  );
}

export { Sidebarby };
