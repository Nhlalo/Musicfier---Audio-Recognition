import Header from "../../components/layout/header/header";
import Concerts from "./components/findconcerts/findconcert";
import Footer from "../../components/layout/footer/footer";

export default function ConcertList() {
  return (
    <>
      <Header
        bg1="#fff"
        color1="#000"
        logoBG1="#000"
        logoBG2="#000"
        color2="#000"
        btnBG1="#000"
        btnBG2="#000"
      />
      <Concerts />
      <Footer />
    </>
  );
}
