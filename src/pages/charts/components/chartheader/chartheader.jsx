import Styles from "./chartheader.module.css";
import "./chartheader.css";
import artistImg from "../../../../assets/artistImg.jpg";
import { ChevronDown } from "lucide-react";
import { forwardRef, useEffect, useState, useRef } from "react";
import Select from "react-select";
import getAllCountries from "../../../../utilis/countryname/countryname";
//Generate keys for the chart buttons
const chartTypeKeys = [
  crypto.randomUUID(),
  crypto.randomUUID(),
  crypto.randomUUID(),
  crypto.randomUUID(),
];

//Generate keys for the images
const imgKeys = Array.from({ length: 2 }, (_, index) => crypto.randomUUID());
//Generate keys for the  genre buttons
const genreKeys = Array.from({ length: 2 }, (_, index) => crypto.randomUUID());

function Genres() {
  const genres = ["Dance", "Hip-Hip/Rap", "Pop"];

  return (
    <>
      <div className={Styles.genresContainer}>
        {genres.map((value, index) => (
          <button className={Styles.genreBTN} key={genreKeys[index]}>
            {value}
          </button>
        ))}
      </div>
    </>
  );
}

function CountrySelect({ location = "South Africa", classname, classPrefix }) {
  const [selected, setSelected] = useState(null);

  return (
    <Select
      options={getAllCountries()}
      value={selected}
      placeholder={location}
      onChange={setSelected}
      isSearchable={true} // ✅ Control open state
      className={classname}
      classNamePrefix={classPrefix}
    />
  );
}

export default function ChartHeader() {
  const imageSrc = [artistImg, artistImg];
  const chartTypes = ["Top 50", "Viral", "Discovery", "Genres"];

  //Track if the button is clicked or no
  const [buttonClickStatus, setButtonClickStatus] = useState({
    "Top 50": true,
    Viral: false,
    Discovery: false,
    Genres: false,
  });

  const sectionBG = buttonClickStatus["Top 50"]
    ? `${Styles.chartHeaderContainer}`
    : buttonClickStatus.Discovery
      ? `${Styles.chartHeaderContainer} ${Styles.brownBG}`
      : buttonClickStatus.Viral
        ? `${Styles.chartHeaderContainer} ${Styles.blueBG}`
        : `${Styles.chartHeaderContainer} `;

  function changeBTNStatus(top50, viral, discovery, genres) {
    setButtonClickStatus({
      "Top 50": top50,
      Viral: viral,
      Discovery: discovery,
      Genres: genres,
    });
  }

  const handleChartTypeClick = (e) => {
    const item = e.currentTarget.dataset.item;
    if (item === "Top 50") {
      changeBTNStatus(true, false, false, false);
    } else if (item === "Viral") {
      changeBTNStatus(false, true, false, false);
    } else if (item === "Discovery") {
      changeBTNStatus(false, false, true, false);
    } else {
      changeBTNStatus(false, false, false, true);
    }
  };
  return (
    <section className={sectionBG}>
      <div className={Styles.chartHeaderWrapper}>
        <div className={Styles.countryBTNContainer}>
          <CountrySelect classname={Styles.countryBTN} classPrefix="country" />
        </div>
        <div className={Styles.chartContainer}>
          <div className={Styles.inforContainer}>
            <span className={Styles.country}>South Africa</span>
            <span className={Styles.chartName}>Top 200</span>
            <span className={Styles.chartDescr}>
              The top songs in South Africa this week
            </span>
          </div>
          <div className={Styles.buttonContainer}>
            {chartTypes.map((value, index) => {
              return (
                <button
                  key={chartTypeKeys[index]}
                  className={
                    buttonClickStatus[value]
                      ? `${Styles.chartTypeBTNs} ${Styles.buttonClick}`
                      : `${Styles.chartTypeBTNs}`
                  }
                  data-item={value}
                  onClick={handleChartTypeClick}
                >
                  {value === "Genres" ? (
                    <>
                      {value}
                      <ChevronDown
                        className={Styles.chevronIcon}
                        aria-hidden="true"
                      />
                    </>
                  ) : (
                    value
                  )}
                </button>
              );
            })}
            {buttonClickStatus.Genres && <Genres />}
          </div>
        </div>
        <div
          className={
            buttonClickStatus["Top 50"]
              ? Styles.imageContainer
              : buttonClickStatus.Viral
                ? Styles.imageContainerViral
                : buttonClickStatus.Discovery
                  ? Styles.imageContainerDiscovery
                  : Styles.imageContainer
          }
          aria-hidden="true"
        >
          {imageSrc.map((value, index) => {
            return (
              <img
                src={value}
                alt="Artist"
                key={imgKeys[index]}
                className={Styles.sideImage}
                tabIndex="-1"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
