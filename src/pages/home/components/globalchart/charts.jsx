import Styles from "./charts.module.css";
import artistImg from "../../../../assets/artistImg.jpg";
import { ChevronRight } from "lucide-react";

export default function Charts() {
  return (
    <section className={Styles.globalChart}>
      <div className={Styles.globalChartWrapper}>
        <div className={Styles.chartDesriptionContainer}>
          <div className={Styles.chartDescriptionWrapper}>
            <span className={Styles.chartHeading}>Global Top 50</span>
            <h2 className={Styles.chartDescription}>
              Top Songs being discovered around the world right now
            </h2>
            <p className={Styles.artistChartDescr}>
              See who made it on the list of the top songs worldwide on Musicfy
            </p>
          </div>
          <button
            aria-label="View the chart"
            type="button"
            className={Styles.viewChartBTN}
          >
            <img
              src={artistImg}
              alt=""
              aria-hidden="true"
              className={Styles.artistImg}
            />
            <p className={Styles.top50}>GLOBAL TOP 50 CHART</p>
            <p className={Styles.featuredArtists}>
              Featuring songs from Tyla, Drake and more
            </p>
          </button>
        </div>
        <div className={Styles.top50SongsContainer}>
          <div className={Styles.top50SongsWrapper}>
            <h2>Global Top 50 Chart</h2>
            <button
              type="button"
              aria-label="View the whole global top 50 chart"
              className={Styles.viewTop50BTN}
            >
              SEE ALL <ChevronRight aria-hidden="true" />
            </button>
          </div>
          <hr className={Styles.mainHr} />
        </div>
      </div>
    </section>
  );
}
