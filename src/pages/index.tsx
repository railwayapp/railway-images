import Head from "next/head";
import { NextPage, GetServerSideProps } from "next";
import styles from "../styles/Home.module.css";
import { useState, FormEvent } from "react";
import useSWR from "swr";
import { Image } from "@prisma/client";
import { prisma } from "../prisma";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Home: NextPage<{ images: Image[] }> = props => {
  const [src, setSrc] = useState("");
  const { data: images, mutate, revalidate } = useSWR<Image[]>(
    "/api/images",
    fetcher,
    { initialData: props.images },
  );

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (src.trim() === "") {
      return;
    }

    setSrc("");

    mutate(
      [...images, { createdAt: new Date(), src, id: Math.random().toString() }],
      false,
    );
    await fetch("/api/images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ src }),
    });

    revalidate();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Railway on Railway</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Images 🚅</h1>

        <p className={styles.description}>
          Built with <a href="https://railway.app">Railway</a>
        </p>

        <form className={styles.form} onSubmit={onSubmit}>
          <input
            name="image"
            value={src}
            placeholder="Enter an image URL"
            onChange={e => setSrc(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Enter
          </button>
        </form>

        <div className={styles.grid}>
          {images != null &&
            images
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )
              .map(image => (
                <a href={image.src} className={styles.card} key={image.src}>
                  <img src={image.src} className={styles.image} />
                </a>
              ))}
        </div>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const images = await prisma.image.findMany();
  return {
    props: {
      images: images.map(image => ({
        ...image,
        createdAt: image.createdAt.toString(),
      })),
    },
  };
};
