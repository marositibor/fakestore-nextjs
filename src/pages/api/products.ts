// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";

const productHandler: NextApiHandler = async (request, response) => {
  const { amount = 1 } = request.body;

  response.json({ data: amount });
};

export default productHandler;
