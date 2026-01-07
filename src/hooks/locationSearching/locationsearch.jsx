import Styles from "./locationsearch.module.css";
import { useEffect, useState, useRef } from "react";
import { Search, LoaderCircle, ChevronRight } from "lucide-react";
import getLocation from "../../utilis/country/country";

function Loading() {
  return (
    <div className={Styles.loadingContainer}>
      <span className={Styles.visuallyHidden}>Still searching</span>
      <span aria-hidden="true" className={Styles.suggestion}>
        SUGGESTION
      </span>
      <LoaderCircle aria-hidden="true" className={Styles.loaderCircleIcon} />
    </div>
  );
}
function Error() {
  return (
    <div className={Styles.container}>
      <Search className={Styles.searchIcon} aria-hidden="true" />
      <p className={Styles.noResults}>
        We couldn't find any results matching to!
      </p>
      <p className={Styles.correction}>
        Please make sure your words are spelled correctly, or try using
        different key words
      </p>
    </div>
  );
}
function Data({ locationData, modifyConcertsLocation, locationConcerts }) {
  function handleLocation(event, index) {
    // Get data from the button's data attribute
    const button = event.currentTarget;
    const city = button.dataset.city;
    const country = button.dataset.country;
    const fullContent = `${city}, ${country}`;

    const updatedLocations = [...locationConcerts];

    if (updatedLocations.length >= 4) {
      updatedLocations.pop();
    }

    updatedLocations.push(fullContent);
    modifyConcertsLocation(updatedLocations);
  }

  return (
    <div className={Styles.dataContainer}>
      <span className={Styles.visuallyHidden}>Results</span>
      <span aria-hidden="true" className={Styles.dataSuggestion}>
        SUGGESTION
      </span>
      <div className={Styles.dataWrapper}>
        {locationData.length &&
          locationData.slice(1, 6).map((location, index) => {
            return (
              <button
                type="button"
                className={Styles.locationBTN}
                key={location.key}
                onClick={(e) => handleLocation(e, index)}
                data-city={location.city}
                data-country={location.country}
              >
                <div className={Styles.locationContainer}>
                  <span className={Styles.locationCity}>{location.city}</span>
                  <span className={Styles.locationCountry}>
                    {location.country}
                  </span>
                </div>
                <ChevronRight
                  aria-hidden="true"
                  className={Styles.chevronRight}
                />
              </button>
            );
          })}
      </div>
    </div>
  );
}
function useLocationSearch(characterChange) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    /* Implement abort Controller*/
    const abortController = new AbortController();
    const signal = abortController.signal;

    getLocation(characterChange, signal)
      .then((value) => {
        // Check if request was cancelled
        if (value === undefined) {
          throw new Error("No location");
        }
        if (!signal.aborted) {
          setData(value);
          setError(false);
        }
      })
      .catch((error) => {
        // Only set error if it wasn't an abort error
        if (error.name !== "AbortError") {
          setError(true);
        }
      })
      .finally(() => {
        if (!signal.aborted) {
          setLoading(false);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [characterChange]);
  return { data, loading, error };
}

function Location({
  characterChange,
  modifyConcertsLocation,
  locationConcerts,
}) {
  const { data, loading, error } = useLocationSearch(characterChange);

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (data)
    return (
      <Data
        locationData={data}
        modifyConcertsLocation={modifyConcertsLocation}
        locationConcerts={locationConcerts}
      />
    );
}
export { Location };
