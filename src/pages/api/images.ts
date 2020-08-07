import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const images = await prisma.image.findMany();
    res.status(200).json(images);
  } else if (req.method === "POST") {
    const { src } = req.body;

    if (src == null || src.trim() === "") {
      return res.status(400).send({ error: "src required in body" });
    }

    const image = await prisma.image.create({
      data: { src },
    });

    res.status(200).json(image);
  }
};

export default handler;
