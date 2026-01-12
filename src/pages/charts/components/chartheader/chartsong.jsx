import artistImg from "../../../../assets/artistImg.jpg";
import spotifyLogo from "../../../../assets/spotifylogo.png";
import youtubeLogo from "../../../../assets/youtube.png";
import Styles from "./chartsong.module.css";
import { Play } from "lucide-react";

function ChartSong({
  songlink = "google.com",
  chartNumber = 1,
  songname = "Fire and Desire",
  artist = "Drake",
}) {
  return (
    <li className={Styles.chartSong}>
      <div className={Styles.overlay} aria-hidden="true">
        <img
          src={spotifyLogo}
          alt="Spotify Logo"
          className={Styles.spotifyLogo}
        />
      </div>
      <a
        href={songlink}
        aria-label={`play ${songname} by ${artist} on Spotify`}
        className={Styles.songlink}
      >
        <span aria-hidden="true" className={Styles.chartNumber}>
          {chartNumber}
        </span>
        <div aria-hidden="true" className={Styles.songContainer}>
          <div className={Styles.songCoverContainer}>
            <img src={artistImg} alt="" className={Styles.songCover} />
            <div className={Styles.playIconContainer}>
              <Play className={Styles.playIcon} />
            </div>
          </div>
          <div className={Styles.songInforContainer}>
            <span className={Styles.artistName}>{artist}</span>
            <span className={Styles.songName}>{songname}</span>
          </div>
        </div>
      </a>
      <hr aria-hidden="true" />
    </li>
  );
}

function ChartSongContainer() {
  return (
    <ul className={Styles.chartSongContainer}>
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
      <ChartSong />
    </ul>
  );
}

function MusicVideo({
  musicVideoLink = "google.com",
  songname = "Fire and Desire",
  artist = "Drake",
  BG = "rgb(89, 82, 63)",
}) {
  return (
    <div className={Styles.musicVideoContainer}>
      <div className={Styles.musicVideoWrapper}>
        <h2 className={Styles.musicVideoHeader}>Music Video</h2>
        <div
          className={Styles.musicVideoSubContainer}
          style={{ backgroundColor: BG }}
        >
          <div className={Styles.musicVideoLinkContainer}>
            <a
              href={musicVideoLink}
              aria-label={`play ${songname} by ${artist} on Youtube`}
              className={Styles.musicVideoLink}
            >
              <img
                src={artistImg}
                alt={`Song cover of ${songname} by ${artist} `}
                aria-hidden="true"
                className={Styles.songImg}
                loading="lazy"
              />
              <div className={Styles.playContainer}>
                <Play className={Styles.play} aria-hidden="true" />
              </div>
            </a>
          </div>
          <div className={Styles.musicVideoInforContainer}>
            <div className={Styles.musicVideoInfor}>
              {" "}
              <span className={Styles.musicVideoName}>{songname}</span>
              <span className={Styles.musicArtistName}>{artist}</span>
            </div>
            <a
              href={musicVideoLink}
              className={Styles.videoLink}
              aria-label={`play ${songname} by ${artist} on Youtube`}
            >
              {" "}
              Watch On
              <img
                src={youtubeLogo}
                alt="Youtube logo"
                className={Styles.youtubeLogo}
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Chart() {
  return (
    <section className={Styles.chartContainer}>
      <div className={Styles.chartWrapper}>
        <ChartSongContainer />
        <MusicVideo />
      </div>
    </section>
  );
}
