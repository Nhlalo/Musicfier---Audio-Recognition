import Styles from "./findconcert.module.css";
import { Calendar } from "lucide-react";
import artistImg from "../../../../assets/artistImg.jpg";

export default function ArtistConcert({
  artist = "Drake",
  location = "Black River Park, Capetown",
  date = "Wednesday, December 31, 2025",
  genre = "HipHop",
}) {
  return (
    <a
      href="google.com"
      aria-label={`Purchase ticket for ${artist}'s concert on ${date} in ${location}`}
      className={Styles.concertLink}
    >
      <img
        src={artistImg}
        alt="Drake's image"
        loading="lazy"
        aria-hidden="true"
        className={Styles.artistImage}
      />
      <div aria-hidden="true" className={Styles.concertInfor}>
        <span className={Styles.date}>
          <Calendar className={Styles.calendarIcon} />
          {date}
        </span>
        <span className={Styles.artistName}>{artist}</span>
        <span className={Styles.location}>{location}</span>
        <span className={Styles.genre}>{genre}</span>
      </div>
    </a>
  );
}
