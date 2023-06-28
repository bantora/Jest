import { rest } from "msw";

const url = "http://localhost:3030/";

export const handlers = [
  rest.get(`${url}scoops`, (_req, res, context) => {
    return res(
      context.json([
        { name: "Chocolate", imagePath: "/images/chocolate.png" },
        { name: "Vanilla", imagePath: "/images/vanilla.png" },
      ])
    );
  }),
  rest.get(`${url}toppings`, (_req, res, context) => {
    return res(
      context.json([
        { name: 'Cherries', imagePath: '/images/cherries.png' },
        { name: 'M&Ms', imagePath: '/images/m-and-ms.png' },
        { name: 'Hot fudge', imagePath: '/images/hot-fudge.png' },
        ])
    );
  }),
];
