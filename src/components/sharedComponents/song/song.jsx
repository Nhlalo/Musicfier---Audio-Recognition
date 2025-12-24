import React, { useState, useEffect, useRef, useCallback } from "react";
import Styles from "./song.module.css";
import artistImg from "../../../assets/artistImg.jpg";
import { Play, ChevronRight, ChevronLeft } from "lucide-react";
import scrollGrid from "../../../utilis/scrollGrid/scrollgrid";
import {
  getColWidth,
  updateButtons,
} from "../../../utilis/scrollGrid/scrollgrid";

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
  const chartContainerRef = useRef(null);
  let currentColumnRef = useRef(0);
  const resizeTimerRef = useRef(null);
  const [scrollStartStatus, setScrollStartStatus] = useState(true);
  const [scrollEndStatus, setScrollEndStatus] = useState(false);

  function updateCurrentColumn() {
    currentColumnRef.current = Math.floor(
      chartContainerRef.current.scrollLeft / getColWidth(),
    );
  }

  useEffect(() => {
    updateCurrentColumn();
    const handleResize = () => {
      chartContainerRef.current.style.scrollBehavior = "auto";
      chartContainerRef.current.style.pointerEvents = "none";
      resizeTimerRef.current = setTimeout(() => {
        // After resize, keep same column at left edge
        const newColWidth = getColWidth();

        const targetScroll = currentColumnRef.current * newColWidth;
        const maxScroll =
          chartContainerRef.current.scrollWidth -
          chartContainerRef.current.clientWidth;

        chartContainerRef.current.scrollLeft = Math.min(
          targetScroll,
          maxScroll,
        );
        updateButtons(
          chartContainerRef.current,
          updateScrollStartStatus,
          updateScrollEndStatus,
          scrollEndStatus,
        );
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimerRef.current); // Clear timer on unmount
    };
  }, [updateCurrentColumn]);

  function updateScrollStartStatus(status) {
    setScrollStartStatus(status);
  }
  function updateScrollEndStatus(status) {
    setScrollEndStatus(status);
  }

  const handleLeftScroll = function () {
    scrollGrid(
      chartContainerRef.current,
      "left",
      updateScrollStartStatus,
      updateScrollEndStatus,
      scrollEndStatus,
      currentColumnRef.current,
    );
  };
  const handleRightScroll = function () {
    scrollGrid(
      chartContainerRef.current,
      "right",
      updateScrollStartStatus,
      updateScrollEndStatus,
      scrollEndStatus,
      currentColumnRef.current,
    );
  };

  return (
    <>
      <div className={Styles.chartContainer}>
        <div className={Styles.overlay}></div>
        <div className={Styles.chartWrapper} ref={chartContainerRef}>
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
      </div>
      <div className={Styles.chartNavigatorBTNContainer}>
        <button
          type="button"
          aria-label="Shift to the left to view the previous part of the chart"
          onClick={handleLeftScroll}
          className={
            scrollStartStatus
              ? `${Styles.toLeftBTN} ${Styles.btnDisable}`
              : `${Styles.toLeftBTN}`
          }
        >
          <ChevronLeft aria-hidden="true" className={Styles.toLeftIcon} />
        </button>
        <button
          type="button"
          aria-label="Shift to the right to view the rest of the chart"
          onClick={handleRightScroll}
          className={
            scrollEndStatus
              ? `${Styles.toRightBTN} ${Styles.btnDisable}`
              : `${Styles.toRightBTN}`
          }
        >
          <ChevronRight aria-hidden="true" className={Styles.toRightIcon} />
        </button>
      </div>
    </>
  );
}
