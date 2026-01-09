import Styles from "./chartheader.module.css";
import artistImg from "../../../../assets/artistImg.jpg";
import { ChevronDown } from "lucide-react";

//Generate keys for the chart buttons
const chartTypeKeys = [
  crypto.randomUUID(),
  crypto.randomUUID(),
  crypto.randomUUID(),
  crypto.randomUUID(),
];

//Generate keys for the images
const imgKeys = Array.from({ length: 2 }, (_, index) => ({
  id: crypto.randomUUID(),
  content: `Item ${index + 1}`,
}));
export default function ChartHeader() {
  const imageSrc = [artistImg, artistImg];
  const chartTypes = ["Top 20", "Viral", "Discovery", "Genres"];
  return (
    <section className={Styles.chartHeaderContainer}>
      <div className={Styles.chartHeaderWrapper}>
        <div className={Styles.countryBTNContainer}>
          <button
            className={Styles.countryBTN}
            aria-label="Select the country in which you want to view its chart"
          >
            South Africa{" "}
            <ChevronDown aria-hidden="true" className={Styles.chevronIcon} />
          </button>
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
                  className={Styles.chartTypeBTNs}
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
          </div>
        </div>
        <div className={Styles.imageContainer}>
          {imageSrc.map((value, index) => {
            return <img src={value} alt="Artist" key={imgKeys[index]} />;
          })}
        </div>
      </div>
    </section>
  );
}
