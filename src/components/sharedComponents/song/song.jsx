import React, { useState, useEffect, useRef } from "react";
import Styles from "./song.module.css";
import artistImg from "../../../assets/artistImg.jpg";
import { Play } from "lucide-react";

function Song() {
  return (
    <a
      href="google.com"
      aria-label="View the song profile"
      className={Styles.songProfileLink}
    >
      <div className={Styles.songProfileWrapper}>
        <div className={Styles.playSongWrapper}>
          <span aria-label="Chart Position: " className={Styles.chartPosition}>
            1
          </span>
          <button
            type="button"
            aria-label="play song"
            className={Styles.playSongBTN}
          >
            <img
              src={artistImg}
              alt="Drake"
              aria-hidden="true"
              className={Styles.artistImg}
            />
            <div className={Styles.playIconContainer}>
              <Play aria-hidden="true" className={Styles.songPlayIcon} />
            </div>
          </button>
        </div>
        <div className={Styles.songInforWrapper}>
          <a
            href="google.com"
            aria-label="View the song profile"
            className={Styles.songName}
          >
            Headlines
          </a>
          <a
            href="google.com"
            aria-label="View the artist's profile"
            className={Styles.artistName}
          >
            Drake
          </a>
        </div>
      </div>
      <hr aria-hidden="true" className={Styles.hr} />
    </a>
  );
}

export default function ChartContainer() {
  return (
    <div className={Styles.chartContainer}>
      <div className={Styles.overlay}></div>
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
    </div>
  );
}
