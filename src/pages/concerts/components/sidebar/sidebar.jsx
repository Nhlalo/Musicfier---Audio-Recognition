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
import { openDialog, closeDialog } from "../../../../utilis/side bar/sidebar";

let focusableElements;
const talk = "class";

/* Deal with focusable Elements, place in an array*/
function Duration({
  startDate = "2024-01-02",
  endDate = "2025-01-04",
  startDateInputRef,
  endDateInputRef,
  customRangeClassName,
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
          ref={startDateInputRef}
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
          ref={endDateInputRef}
        />
      </div>
    </div>
  );
}
const Sidebarby = forwardRef(function (props, ref) {
  //Determine the visibility of the custom range concert duaration
  const [concertDurationVisibility, setConcertDurationVisibility] =
    useState("hide");

  //Determine the visibility of the location input search
  const [locationSearchVisibility, setLocationSearchVisibility] =
    useState("hide");

  const { location, showBTNRef } = props; // Destructure from props

  //All the elements that must be within the tabindex when the side bar is open
  const upcomingBTNRef = useRef(null);
  const todayBTNRef = useRef(null);
  const tommorrowBTNRef = useRef(null);
  const weekendBTNRef = useRef(null);
  const customRangeBTNRef = useRef(null);
  const startBTNRef = useRef(null);
  const endsBTNRef = useRef(null);
  const clearBTNRef = useRef(null);
  const nearMeBTNRef = useRef(null);
  const firstCountryBTNRef = useRef(null);
  const secondCountryBTNRef = useRef(null);
  const thirdCountryRef = useRef(null);
  const newLocationBTNRef = useRef(null);
  const searchInputBTNRef = useRef(null);

  const allFocusableElements = [
    showBTNRef,
    upcomingBTNRef.current,
    todayBTNRef.current,
    tommorrowBTNRef.current,
    weekendBTNRef.current,
    customRangeBTNRef.current,
    startBTNRef.current,
    endsBTNRef.current,
    clearBTNRef.current,
    nearMeBTNRef.current,
    firstCountryBTNRef.current,
    secondCountryBTNRef.current,
    thirdCountryRef.current,
    newLocationBTNRef.current,
    searchInputBTNRef.current,
  ];
  focusableElements = allFocusableElements;

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
  }

  return (
    <dialog
      className={`${Styles.filterConcerts} ${Styles.sidebarContainer}`}
      ref={ref}
    >
      <div className={Styles.whenContainer}>
        <span className={Styles.visuallyHidden}>
          Select the date of the concerts
        </span>
        <h3 className={Styles.when} aria-hidden="true">
          When?
        </h3>
        <div className={Styles.todayContainer}>
          <button
            type="button"
            className={`${Styles.upcoming} ${Styles.BTNs}`}
            ref={upcomingBTNRef}
          >
            All Upcoming
          </button>
          <button
            type="button"
            className={`${Styles.today} ${Styles.BTNs}`}
            ref={todayBTNRef}
          >
            Today
          </button>
        </div>
        <div className={Styles.tomorrowContainer}>
          <button
            type="button"
            className={`${Styles.tomorrow} ${Styles.BTNs}`}
            ref={tommorrowBTNRef}
          >
            Tomorrow
          </button>
          <button
            type="button"
            className={`${Styles.weekend} ${Styles.BTNs}`}
            ref={weekendBTNRef}
          >
            This Weekend
          </button>
        </div>
        <button
          type="button"
          className={Styles.customRangeBTN}
          ref={customRangeBTNRef}
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
          startDateInputRef={startBTNRef}
          endDateInputRef={endsBTNRef}
          customRangeClassName={
            concertDurationVisibility == "show"
              ? Styles.dateContainer
              : Styles.noVisibility
          }
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
            <button type="button" className={Styles.clearBTN} ref={clearBTNRef}>
              clear
            </button>
          </div>
        </div>
        <div className={Styles.nearMeContainer}>
          <button
            type="button"
            className={`${Styles.nearMe} ${Styles.BTNs}`}
            ref={nearMeBTNRef}
          >
            Near Me
          </button>
          <button
            type="button"
            className={`${Styles.usa} ${Styles.BTNs}`}
            ref={firstCountryBTNRef}
          >
            USA
          </button>
        </div>
        <div className={Styles.locationContainer}>
          <button
            type="button"
            className={`${Styles.australia} ${Styles.BTNs}`}
            ref={secondCountryBTNRef}
          >
            Australia
          </button>
          <button
            type="button"
            className={`${Styles.location} ${Styles.BTNs}`}
            ref={thirdCountryRef}
          >
            {location}
          </button>
        </div>
        <button
          type="button"
          className={Styles.newLocationBTN}
          ref={newLocationBTNRef}
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
          />
        </div>
      </div>
    </dialog>
  );
});
export default function SidebarVisibility() {
  const [visibleButton, setVisibleButton] = useState("show");
  const [buttonRef, setButtonRef] = useState(false);
  const sidebarRef = useRef(null);
  const showBTNRef = useRef(null);
  const previousFocusedElement = useRef(null);

  useEffect(() => {
    setButtonRef(true);
  }, []);
  console.log(showBTNRef.current);

  const handleCloseModal = function () {
    const sideBarvalue = sidebarRef.current;
    closeDialog(
      sideBarvalue,
      focusableElements,
      previousFocusedElement.current,
    );
    setVisibleButton("show");
  };
  const handleOpenModal = function () {
    console.log(sidebarRef.current);
    previousFocusedElement.current = document.activeElement;
    const sideBarvalue = sidebarRef.current;
    openDialog(sideBarvalue, focusableElements);
    setVisibleButton("hide");
  };

  return (
    <>
      <div className={Styles.filterConcerts}>
        <div className={Styles.headingContainer}>
          <h2 className={Styles.heading}>Filter Concerts</h2>
          <button
            type="button"
            className={
              visibleButton == "show" ? Styles.showBTN : Styles.noVisibility
            }
            aria-label="Open the side bar"
            onClick={handleOpenModal}
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
      <Sidebarby ref={sidebarRef} showBTNRef={showBTNRef.current} />
    </>
  );
}
