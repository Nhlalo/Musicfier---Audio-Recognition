import React, { useState, useEffect, useRef, useCallback } from "react";
import Styles from "./featuredartists.module.css";
import artistImg from "../../../assets/artistImg.jpg";
import { Play, ChevronRight, ChevronLeft } from "lucide-react";
import {
  getScrollAmount,
  updateButtons,
  scrollGrid,
  handleResize,
  updateLeftEdgeSong,
  scrollToSongAtLeftEdge,
} from "../../../utilis/scrollGrid/scrollgrid";

function FeaturedArtist() {
  return (
    <a href="google.com" aria-label="View Drake's profile">
      <figure className={Styles.artistWrapper} aria-hidden="true">
        <img src={artistImg} alt="Drake" className={Styles.artistImg} />
        <figcaption className={Styles.artistName}>Drake</figcaption>
      </figure>
    </a>
  );
}
export default function FeaturedArtists() {
  const chartContainerRef = useRef(null);
  const resizeTimeoutRef = useRef(null);
  const leftEdgeSongRef = useRef(0);
  const isResizingRef = useRef(false);
  const originalScrollBehaviorRef = useRef("smooth"); // Store original behavior

  const [scrollStartStatus, setScrollStartStatus] = useState(true);
  const [scrollEndStatus, setScrollEndStatus] = useState(false);

  // ===== CUSTOM HOOKS FOR SCROLL LOGIC =====

  const updateButtonsCallback = useCallback(() => {
    if (!chartContainerRef.current) return;

    const maxScroll = Math.max(
      0,
      chartContainerRef.current.scrollWidth -
        chartContainerRef.current.clientWidth,
    );
    const currentScroll = chartContainerRef.current.scrollLeft;

    setScrollStartStatus(currentScroll <= 1);
    setScrollEndStatus(currentScroll >= maxScroll - 1);
  }, []);

  const updateLeftEdgeSongCallback = useCallback(() => {
    if (!chartContainerRef.current) return;
    leftEdgeSongRef.current = updateLeftEdgeSong(chartContainerRef.current);
  }, []);

  const scrollToSongCallback = useCallback((songIndex) => {
    if (!chartContainerRef.current) return;
    scrollToSongAtLeftEdge(chartContainerRef.current, songIndex);
    leftEdgeSongRef.current = songIndex;
  }, []);

  const scrollGridCallback = useCallback(
    (direction) => {
      if (!chartContainerRef.current || isResizingRef.current) return;

      // Restore smooth scrolling if it was disabled
      const grid = chartContainerRef.current;
      if (grid.style.scrollBehavior === "auto") {
        grid.style.scrollBehavior =
          originalScrollBehaviorRef.current || "smooth";
      }

      updateLeftEdgeSongCallback();

      scrollGrid(
        chartContainerRef.current,
        direction,
        updateButtonsCallback,
        getScrollAmount(),
      );

      updateLeftEdgeSongCallback();
    },
    [updateButtonsCallback, updateLeftEdgeSongCallback],
  );

  const handleResizeCallback = useCallback(() => {
    if (!chartContainerRef.current || isResizingRef.current) return;

    isResizingRef.current = true;
    const grid = chartContainerRef.current;

    // Store original scroll behavior BEFORE changing it
    originalScrollBehaviorRef.current = grid.style.scrollBehavior || "smooth";

    updateLeftEdgeSongCallback();
    const songToKeepVisible = leftEdgeSongRef.current;

    // Disable smooth scroll temporarily
    grid.style.scrollBehavior = "auto";
    document.body.classList.add("no-transitions");

    clearTimeout(resizeTimeoutRef.current);
    resizeTimeoutRef.current = setTimeout(() => {
      handleResize(
        chartContainerRef.current,
        songToKeepVisible,
        scrollToSongCallback,
        updateButtonsCallback,
        isResizingRef,
      );

      // RESTORE smooth scrolling after resize is complete
      setTimeout(() => {
        grid.style.scrollBehavior = originalScrollBehaviorRef.current;
        document.body.classList.remove("no-transitions");
      }, 100); // Slightly longer delay to ensure restore
    }, 200);
  }, [updateLeftEdgeSongCallback, scrollToSongCallback, updateButtonsCallback]);

  // ===== EVENT LISTENERS =====

  useEffect(() => {
    // Initialize with smooth scrolling
    const grid = chartContainerRef.current;
    if (grid) {
      originalScrollBehaviorRef.current = grid.style.scrollBehavior || "smooth";
      grid.style.scrollBehavior = "smooth";
    }

    updateLeftEdgeSongCallback();
    updateButtonsCallback();

    window.addEventListener("resize", handleResizeCallback);

    const handleScroll = () => {
      if (!isResizingRef.current) {
        updateLeftEdgeSongCallback();
        updateButtonsCallback();
      }
    };

    if (grid) {
      grid.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("resize", handleResizeCallback);
      clearTimeout(resizeTimeoutRef.current);
      if (grid) {
        grid.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleResizeCallback, updateLeftEdgeSongCallback, updateButtonsCallback]);

  // ===== EVENT HANDLERS =====

  const handleLeftScroll = () => scrollGridCallback("left");
  const handleRightScroll = () => scrollGridCallback("right");

  return (
    <>
      <div className={Styles.featuredArtistsContainer}>
        <div className={Styles.overlay}></div>
        <div className={Styles.featuredArtistsWrapper} ref={chartContainerRef}>
          <FeaturedArtist />
          <FeaturedArtist />
          <FeaturedArtist />
          <FeaturedArtist />
          <FeaturedArtist />
          <FeaturedArtist />
          <FeaturedArtist />
          <FeaturedArtist />
          <FeaturedArtist />
          <FeaturedArtist />
          <FeaturedArtist />
          <FeaturedArtist />
          <FeaturedArtist />
          <FeaturedArtist />
          <FeaturedArtist />
          <FeaturedArtist />
          <FeaturedArtist />
          <FeaturedArtist />
          <FeaturedArtist />
          <FeaturedArtist />
          <FeaturedArtist />
          <FeaturedArtist />
          <FeaturedArtist />
        </div>
      </div>
      <div className={Styles.artistNavigatorBTNContainer}>
        <button
          type="button"
          aria-label="Shift to the left to view the previous part of the chart"
          onClick={handleLeftScroll}
          disabled={scrollStartStatus}
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
          disabled={scrollEndStatus}
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
