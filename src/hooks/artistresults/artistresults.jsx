import Styles from "./artistresults.module.css";
import artistImg from "../../assets/artistImg.jpg";
import { useState } from "react";
import { Search, LoaderCircle } from "lucide-react";

function Artists({ imagesrc, name = "Drake" }) {
  return (
    <button
      type="button"
      aria-label={`Select to view ${name} concert details`}
      className={Styles.artistInfor}
    >
      <img
        src={artistImg}
        alt={`${name}`}
        className={Styles.artistImg}
        aria-hidden="true"
      />
      <span className={Styles.artistName} aria-hidden="true">
        {name}
      </span>
    </button>
  );
}

export default function Data({ artistsInfor }) {
  // const [artistCount, setArtistCount] = useState(3);
  // artistsInfor.slice(0,artistCount).map((data) => {
  //     return <Artists imagesrc={data.value} name={data.name}/>
  // })

  function handleClick() {
    setArtistCount((prev) => prev + 3);
  }

  return (
    <div className={Styles.artistsContainer}>
      <span className={Styles.artists}>Artists</span>
      <Artists />
      <Artists />
      <Artists />
      <Artists />
      <Artists />
      <Artists />
      {artistCount < artistsInfor.length && (
        <button
          type="button"
          className={Styles.showMoreBTN}
          onClick={handleClick}
        >
          Show More
        </button>
      )}
    </div>
  );
}
