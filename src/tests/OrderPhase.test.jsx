import { screen, render } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";

import App from "../App";

test("order phases for happy path", async () => {
  const user = UserEvent.setup();
  //render app
  render(<App />);

  //add ice cream scoops and toppings
  const scoopsInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  const toppingsinput = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  await user.clear(scoopsInput);
  await user.type(scoopsInput, "1");
  await user.click(toppingsinput);

  //find and click order button
  const orderSundae = screen.getByRole("button", { name: "Order Sundae" });
  await user.click(orderSundae);

  //check summary information based on order
  const scoopsOrdered = screen.getByRole("heading", { name: /scoops: \$/i });
  expect(scoopsOrdered).toHaveTextContent("2.00");
  const toppingsOrdered = screen.getByText("Toppings: ", { exact: false });
  expect(toppingsOrdered).toHaveTextContent("1.50");

  //accept terms and conditions and click button to confirm order
  const acceptTerms = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  await user.click(acceptTerms);
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });
  expect(confirmButton).toBeEnabled();
  await user.click(confirmButton);

  //confirm order numbner on confirmation page
  const thankyouHeader = screen.getByText("Thank you!", { exact: false });
  expect(thankyouHeader).toBeInTheDocument();
  const confirmNo = screen.getByText("Your order number is", { exact: false });
  expect(confirmNo).toBeInTheDocument();

  //click new order button on confitmation page
  const createNewOrder = screen.getByRole("button", {
    name: "Create new order",
  });
  await user.click(createNewOrder);

  //check  that scoops and topppings subtotal have been reset
  const scoopsTotal = screen.getByText("Scoops total: $", {
    exact: false,
  });
  expect(scoopsTotal).toHaveTextContent("0.00");
  const toppingsTotal = screen.getByText(/toppings total: \$/i, {
    exact: false,
  });
  expect(toppingsTotal).toHaveTextContent("0.00");
});
