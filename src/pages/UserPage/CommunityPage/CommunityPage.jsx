import CommunityContainer from "../../../components/UserContainer/CommunityContainer";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import Navigation from "../../../components/Navigation/Navigation";

function CommunityPage() {
  return (
    <div>
      <Header />
      <Navigation />
      <CommunityContainer />
      <Footer />
    </div>
  );
}

export default CommunityPage;