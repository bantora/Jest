import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./context/OrderDetails";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry></OrderEntry>
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
