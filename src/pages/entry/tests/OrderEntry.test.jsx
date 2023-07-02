import { render, screen, waitFor } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("handles errors", async () => {
  server.resetHandlers(() => {
    rest.get("http://localhost:3030/scoops", (_req, res, context) =>
      res(context.status(500))
    );
    rest.get("http://localhost:3030/toppings", (_req, res, context) =>
      res(context.status(500))
    );
  });

  render(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");

    expect(alerts).toHaveLength(2);
  });
});
