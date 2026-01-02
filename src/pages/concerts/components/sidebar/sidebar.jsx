import Styles from "./sidebar.module.css";
import { ChevronDown, MapPinCheck, Calendar, X } from "lucide-react";

function Duration({ startDate = "2024-01-02", endDate = "2025-01-04" }) {
  return (
    <div className={Styles.dateContainer}>
      <div className={Styles.startDateContainer}>
        <label htmlFor="startDate" className={Styles.start}>
          Starts
        </label>
        <input
          type="date"
          id="startDate"
          name="start_date"
          className={Styles.startDate}
          value={startDate}
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
          value={endDate}
        />
      </div>
    </div>
  );
}
export default function Sidebar({ location = "South Africa" }) {
  return (
    <aside className={Styles.filterConcerts}>
      <div className={Styles.headingContainer}>
        <h2 className={Styles.heading}>Filter Concerts</h2>
        <button
          type="button"
          className={Styles.hideBTN}
          aria-label="Close the side bar"
        >
          <X aria-hidden="true" />
        </button>
      </div>
      <div className={Styles.whenContainer}>
        <span class={Styles.visuallyHidden}>
          Select the date of the concerts
        </span>
        <h3 className={Styles.when} aria-hidden="true">
          When?
        </h3>
        <div className={Styles.todayContainer}>
          <button type="button" className={`${Styles.upcoming} ${Styles.BTNs}`}>
            All Upcoming
          </button>
          <button type="button" className={`${Styles.today} ${Styles.BTNs}`}>
            Today
          </button>
        </div>
        <div className={Styles.tomorrowContainer}>
          <button type="button" className={`${Styles.tomorrow} ${Styles.BTNs}`}>
            Tomorrow
          </button>
          <button type="button" className={`${Styles.weekend} ${Styles.BTNs}`}>
            This Weekend
          </button>
        </div>
        <button type="button" className={Styles.customRangeBTN}>
          <Calendar aria-hidden="true" />{" "}
          <span className={Styles.customRange}>Custom Range</span>{" "}
          <ChevronDown aria-hidden="true" />
        </button>
        <Duration />
      </div>
      <div className={Styles.whereContainer}>
        <div>
          <div className={Styles.clearContainer}>
            <h3 class={Styles.visuallyHidden}>
              Select the locatiion of the concerts
            </h3>
            <h3 className={Styles.where} aria-hidden="true">
              Where?
            </h3>
            <button type="button" className={Styles.clearBTN}>
              clear
            </button>
          </div>
        </div>
        <div className={Styles.nearMeContainer}>
          <button type="button" className={`${Styles.nearMe} ${Styles.BTNs}`}>
            Near Me
          </button>
          <button type="button" className={`${Styles.usa} ${Styles.BTNs}`}>
            USA
          </button>
        </div>
        <div className={Styles.locationContainer}>
          <button
            type="button"
            className={`${Styles.australia} ${Styles.BTNs}`}
          >
            Australia
          </button>
          <button type="button" className={`${Styles.location} ${Styles.BTNs}`}>
            {location}
          </button>
        </div>
        <button type="button" className={Styles.newLocationBTN}>
          <MapPinCheck aria-hidden="true" />
          <span className={Styles.newLocation}>New Location</span>{" "}
          <ChevronDown aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
