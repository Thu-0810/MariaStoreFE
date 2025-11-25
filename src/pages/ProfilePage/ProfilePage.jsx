import HomeContainer from "../../components/Container/HomeContainer";
import ProfileContainer from "../../components/Container/ProfileContainer";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";

function ProfilePage() {
  return (
    <div>
      <Header />
      <ProfileContainer />
      <Footer />
    </div>
  );
}

export default ProfilePage;