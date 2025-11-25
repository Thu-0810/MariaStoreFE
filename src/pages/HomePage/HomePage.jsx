import HomeContainer from "../../components/Container/HomeContainer";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";

function HomePage() {
  return (
    <div>
      <Header />
      <Navigation />
      <HomeContainer />
      <Footer />
    </div>
  );
}

export default HomePage;