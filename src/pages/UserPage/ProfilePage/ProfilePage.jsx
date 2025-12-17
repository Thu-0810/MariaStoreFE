import HomeContainer from "../../../components/UserContainer/HomeContainer";
import ProfileContainer from "../../../components/UserContainer/ProfileContainer";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import Navigation from "../../../components/Navigation/Navigation";

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