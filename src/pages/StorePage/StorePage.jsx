import StoreContainer from "../../components/Container/StoreContainer";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";

function StorePage() {
  return (
    <div>
      <Header />
      <Navigation />
      <StoreContainer />
      <Footer />
    </div>
  );
}

export default StorePage;