import React, { useState, useEffect, useRef } from "react";
import Styles from "./charts.module.css";
import artistImg from "../../../assets/artistImg.jpg";
import { ChevronRight } from "lucide-react";

export default function Charts({
  mainBG = "#fff",
  displayFeaturedArtistsImg,
  heading,
  headingDescr,
  miniHeading,
  displayChart,
  subHeading,
  chartContainer,
  featuredArtists,
}) {
  const [hoverStatus, setHoverStatus] = useState(false);
  const displayChartBTN = useRef(null);

  return (
    <section
      className={Styles.globalChart}
      style={{ backgroundColor: `${mainBG}` }}
    >
      <div className={Styles.globalChartWrapper}>
        <div
          className={Styles.featuredArtistsImgContainer}
          style={{ display: displayFeaturedArtistsImg ? "flex" : "none" }}
        >
          <img
            src={artistImg}
            alt="Featured artists on this chart"
            className={Styles.supportingImg}
          />
          <img
            src={artistImg}
            alt="Featured artists on this chart"
            className={Styles.mainImg}
          />
          <img
            src={artistImg}
            alt="Featured artists on this chart"
            className={Styles.supportingImg2}
          />
        </div>
        <div className={Styles.chartDesriptionContainer}>
          <div className={Styles.chartDescriptionWrapper}>
            <span className={Styles.chartHeading}>{heading}</span>
            <h2 className={Styles.chartDescription}>{headingDescr}</h2>
            <p className={Styles.artistChartDescr}>{miniHeading}</p>
          </div>
          <button
            aria-label="View the chart"
            type="button"
            className={Styles.viewChartBTN}
            ref={displayChartBTN}
            onMouseEnter={() => setHoverStatus(true)}
            onMouseLeave={() => setHoverStatus(false)}
            style={{ display: displayChart ? "block" : "none" }}
          >
            <img
              src={artistImg}
              alt=""
              aria-hidden="true"
              className={Styles.artistImg}
            />
            <p
              className={Styles.top50}
              aria-hidden="true"
              style={{ display: hoverStatus ? "none" : "block" }}
            >
              GLOBAL TOP 50 CHART
            </p>
            <p
              className={Styles.featuredArtists}
              aria-hidden="true"
              style={{ display: hoverStatus ? "none" : "block" }}
            >
              Featuring songs from Tyla, Drake and more
            </p>
            <div
              className={Styles.viewChart}
              aria-hidden="true"
              style={{ display: hoverStatus ? "flex" : "none" }}
            >
              View Chart
            </div>
          </button>
        </div>
        <div className={Styles.top50SongsContainer}>
          <div className={Styles.top50SongsWrapper}>
            <h2 className={Styles.heading}>{subHeading}</h2>
            <button
              type="button"
              aria-label="View the whole global top 50 chart"
              className={Styles.viewTop50BTN}
            >
              SEE ALL <ChevronRight aria-hidden="true" />
            </button>
          </div>
          <hr className={Styles.mainHr} aria-hidden="true" />
          {chartContainer}
        </div>
        <div className={Styles.featuredArtistsContainer}>
          <div className={Styles.featuredArtistsWrapper}>
            <h2 className={Styles.heading}>Featured Artists</h2>
          </div>
          <hr className={Styles.mainHr} aria-hidden="true" />
          {featuredArtists}
        </div>
      </div>
    </section>
  );
}
