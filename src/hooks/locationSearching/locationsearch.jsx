import Styles from "./locationsearch.module.css";
import { useEffect, useState } from "react";
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
export default function Data({ locationData }) {
  return (
    <div className={Styles.dataContainer}>
      <span className={Styles.visuallyHidden}>Results</span>
      <span aria-hidden="true" className={Styles.dataSuggestion}>
        SUGGESTION
      </span>
      <div className={Styles.dataWrapper}>
        {locationData.length &&
          locationData.slice(1, 6).map((location) => {
            return (
              <button
                type="button"
                className={Styles.locationBTN}
                key={location.key}
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

const locationSearch = new Promise((resolve, reject) => {
  const location = [
    { city: "Cape Town", country: "South Africa", key: crypto.randomUUID() },
    { city: "Cape Town", country: "South Africa", key: crypto.randomUUID() },
    { city: "Cape Town", country: "South Africa", key: crypto.randomUUID() },
    { city: "Cape Town", country: "South Africa", key: crypto.randomUUID() },
    { city: "Cape Town", country: "South Africa", key: crypto.randomUUID() },
    { city: "Cape Town", country: "South Africa", key: crypto.randomUUID() },
    { city: "Cape Town", country: "South Africa", key: crypto.randomUUID() },
  ];
  const locationNo = false;
  if (location) {
    setTimeout(() => {
      resolve(location);
    }, 1000);
  } else {
    setTimeout(() => {
      reject(new Error("Geolocation not supported"));
    }, 10000);
  }
});

function useLocationSearch(characterChange) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    locationSearch
      .then((value) => {
        console.log(value);
        return setData(value);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [characterChange]);
  return { data, loading, error };
}

function Location({ characterChange }) {
  const { data, loading, error } = useLocationSearch(characterChange);

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (data) return <Data locationData={data} />;
}
export { Location };
