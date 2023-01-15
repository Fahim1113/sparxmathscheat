import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

function Home(props) {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [dataNew, setDataNew] = useState([]);
  const { query } = useRouter();

  useEffect(() => {
    fetch("/api/find-answers", {
      method: "POST",
      body: JSON.stringify({
        username: query.username,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setDataNew(res.data);
      });
  }, []);

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
          style={{
            paddingTop: 50,
            width: "75%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          className={`d-flex justify-content-between`}
        >
          <input
            type="text"
            className={`form-control form-control-lg w-50`}
            placeholder="Search bookwork code"
            onChange={(e) => {
              setSearch(e.target.value);
              setDataNew(
                data.filter((x) =>
                  x.bookworkCode.toLowerCase().includes(e.target.value)
                )
              );
            }}
            value={search}
          />
          <button
            className={`btn btn-light text-dark`}
            onClick={(e) => {
              e.preventDefault();
              console.log(query);
              Router.push(
                {
                  pathname: "/add-answer",
                  query: { username: query.username },
                },
                "/add-answer"
              );
            }}
          >
            Add answer
          </button>
        </div>
        <div
          className="bg-light rounded"
          style={{
            marginTop: 50,
            width: "75%",
            marginLeft: "auto",
            marginRight: "auto",
            padding: 30,
          }}
        >
          <div className="row">
            <h1 className="col-6" style={{ fontSize: 20, fontWeight: "bold" }}>
              Bookwork code
            </h1>
            <h1 className="col-6" style={{ fontSize: 20, fontWeight: "bold" }}>
              Answer
            </h1>
          </div>
          {dataNew.map((x, i) => {
            return (
              <div className="item row" style={{ marginTop: 10 }} key={i}>
                <h1 className="col-6" style={{ fontSize: 20 }}>
                  {x.bookworkCode}
                </h1>
                <h1 className="col-6" style={{ fontSize: 20 }}>
                  {x.answer}
                </h1>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default home;
