import Charts from "../../../../components/sharedComponents/globalchart/charts";
import ChartContainer from "../../../../components/sharedComponents/song/song";
import FeaturedArtists from "../../../../components/sharedComponents/featuredArtists/featuredartists";

export default function LocalCharts({ location = "South Africa" }) {
  const content = {
    mainBG: "#f2f2f7",
    displayFeaturedArtistsImg: true,
    heading: `DISCOVERY ${location.toUpperCase()}`,
    headingDescr: "Rising tracks from new and upcoming artists",
    miniHeading: "Be the first to listen to these future hit songs",
    displayChart: false,
    subHeading: `Discovery ${location} Tracks`,
    chartContainer: <ChartContainer />,
    featuredArtists: <FeaturedArtists />,
  };

  return (
    <Charts
      mainBG={content.mainBG}
      displayFeaturedArtistsImg={content.displayFeaturedArtistsImg}
      heading={content.heading}
      headingDescr={content.headingDescr}
      miniHeading={content.miniHeading}
      displayChart={content.displayChart}
      subHeading={content.subHeading}
      chartContainer={content.chartContainer}
      featuredArtists={content.featuredArtists}
    />
  );
}
