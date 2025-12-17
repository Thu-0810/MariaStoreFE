import OrderContainer from "../../../components/UserContainer/OrderContainer";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import Navigation from "../../../components/Navigation/Navigation";

function OrderPage() {
  return (
    <div>
      <Header />
      <Navigation />
      <OrderContainer />
      <Footer />
    </div>
  );
}

export default OrderPage;