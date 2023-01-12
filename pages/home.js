import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Router from "next/router";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

function home(props) {
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])
  const {
    query: { username },
  } = useRouter();

  useEffect(()=>{
    fetch("")
  }, [])

  return (
    <>
      <Head>
        <title>School Management System | Register</title>
        <meta name="description" content="School Management App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`bg-dark ${inter.className}`}
        style={{ minHeight: "100vh", height: "fit-content" }}
      >
        <div
          style={{ paddingTop: 50 }}
          className={`d-flex justify-content-around`}
        >
          <input
            type="text"
            className={`form-control form-control-lg w-50`}
            placeholder="Search"
            onChange={(e)=>setSearch(e.target.value)}
          />
          <button className={`btn btn-light text-dark`}>Add answer</button>
        </div>
        <div>{}</div>
      </main>
    </>
  );
}

export default home;
