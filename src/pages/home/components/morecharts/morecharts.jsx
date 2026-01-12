import { SectionIcon } from "lucide-react";
import Styles from "./morecharts.module.css";
import artistImg from "../../../../assets/artistImg.jpg";

function MoreCharts({ location = "South Africa" }) {
  const heading = `Top 50 ${location}`;
  return (
    <a
      className={Styles.chartLink}
      aria-label={`View the Top 50 ${location} chart`}
      href="google.com"
    >
      <div className={Styles.featuredSongCoverContainer} aria-hidden="true">
        <div className={Styles.featuredSongCoverWrapper}>
          <img
            src={artistImg}
            alt="featured song cover"
            className={Styles.featuredSongCover}
            loading="lazy"
          />
        </div>
        <div className={Styles.featuredSongCoverWrapper}>
          <img
            src={artistImg}
            alt="featured song cover"
            className={Styles.featuredSongCover}
            loading="lazy"
          />
        </div>
        <div className={Styles.featuredSongCoverWrapper}>
          <img
            src={artistImg}
            alt="featured song cover"
            className={Styles.featuredSongCover}
            loading="lazy"
          />
        </div>
      </div>
      <div className={Styles.chartDescrContainer} aria-hidden="true">
        <div className={Styles.chartDescrWrapper}>
          <span className={Styles.chartDescrHeading}>Top 50</span>
          <br />
          <span className={Styles.chartDescrHeading}>{location}</span>
          <p className={Styles.featuredArtists}>
            Featuring songs from Muzik Loova, Sam Deep, Nia Pearl & Boohle, DJ
            Smallz, ZinedinexSguche & 031choppa and more
          </p>
        </div>
        <div className={Styles.viewMoreBTN}>VIEW</div>
      </div>
    </a>
  );
}

export default function MoreChartsContainer() {
  return (
    <section className={Styles.moreChartsContainer}>
      <div className={Styles.moreChartsWrapper}>
        <h2 className={Styles.moreChartsHeading}>More Charts</h2>
        <div className={Styles.miniChartsContainer}>
          <MoreCharts />
          <MoreCharts />
        </div>
      </div>
    </section>
  );
}
