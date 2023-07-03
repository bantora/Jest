import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./context/OrderDetails";
import { useState } from "react";
import OrderConfirmation from "./confirmation/OrderConfirmation";
import OrderSummary from "./pages/summary/OrderSummary";

const App = () => {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  const props = { setOrderPhase };

  const RenderPhase = ({ order }) => {
    const phase = {
      inProgress: <OrderEntry {...props} />,
      review: <OrderSummary {...props} />,
      completed: <OrderConfirmation {...props} />,
    };
    return phase[order];
  };

  return (
    <Container>
      <OrderDetailsProvider>
        <RenderPhase order={orderPhase} />
      </OrderDetailsProvider>
    </Container>
  );
};

export default App;
