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

/* Deal with focusable Elements, place in an array*/
function Duration({
  startDate = "2024-01-02",
  endDate = "2025-01-04",
  customRangeClassName,
  valueConcertDurationVisibility,
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
          defaultValue={startDate}
          disabled={(valueConcertDurationVisibility = "show" ? false : true)}
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
          defaultValue={endDate}
          disabled={valueConcertDurationVisibility == "show" ? false : true}
        />
      </div>
    </div>
  );
}
const Sidebarby = forwardRef(function (props, ref) {
  // Destructure from props
  const { location = "South Africa", sideBarClassName } = props;

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

  const searchInputBTNRef = useRef(null);

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
  }

  //Clear the recent location search
  function handleClearLocation() {
    setClearLocation(true);
  }

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
                className={`${Styles.upcoming} ${Styles.BTNs}`}
              >
                All Upcoming
              </button>
              <button
                type="button"
                className={`${Styles.today} ${Styles.BTNs}`}
              >
                Today
              </button>
            </div>
            <div className={Styles.tomorrowContainer}>
              <button
                type="button"
                className={`${Styles.tomorrow} ${Styles.BTNs}`}
              >
                Tomorrow
              </button>
              <button
                type="button"
                className={`${Styles.weekend} ${Styles.BTNs}`}
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
            customRangeClassName={
              concertDurationVisibility == "show"
                ? Styles.dateContainer
                : Styles.noVisibility
            }
            valueConcertDurationVisibility={concertDurationVisibility}
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
            />
          </div>
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
