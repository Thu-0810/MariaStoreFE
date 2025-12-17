import AdminHomeContainer from "../../components/AdminContainer/AdminHomeContainer";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";

function AdminHomePage() {
  return (
    <div>
      <Header />
      <Navigation />
      <AdminHomeContainer />
    </div>
  );
}

export default AdminHomePage;