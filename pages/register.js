import { useState } from "react";
import Head from "next/head";
import Router from "next/router";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Inter } from "@next/font/google";
import styles from "../styles/Register.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [err, setErr] = useState("");

  return (
    <>
      <Head>
        <title>School Management System | Register</title>
        <meta name="description" content="School Management App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`bg-dark d-flex justify-content-center align-items-center flex-column ${styles.main} ${inter.className}`}
      >
        <div className={`container-fluid bg-light ${styles.box}`}>
          <h1 className={`text-dark text-center`}>Register</h1>
          <div
            style={{
              height: 30,
            }}
          />
          <label htmlFor="username" className="form-label text-dark">
            Username:
          </label>
          <input
            type="text"
            className={`form-control form-control-lg`}
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <div
            style={{
              height: 20,
            }}
          />

          <label htmlFor="password" className="form-label text-dark">
            Password:
          </label>
          <div className="input-group" id="password">
            <input
              type={viewPassword ? "text" : "password"}
              className="form-control form-control-lg"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              className="input-group-text"
              onClick={() => {
                setViewPassword(!viewPassword);
              }}
            >
              {viewPassword ? (
                <AiFillEyeInvisible style={{ fontSize: "1.25rem" }} />
              ) : (
                <AiFillEye style={{ fontSize: "1.25rem" }} />
              )}
            </button>
          </div>
          <div
            style={{
              height: 20,
            }}
          />
          <label htmlFor="passwordConfirm" className="form-label text-dark">
            Confirm Password:
          </label>
          <input
            type={"password"}
            className="form-control form-control-lg"
            id="passwordConfirm"
            placeholder="Confirm Password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
          />
          <div
            style={{
              height: 5,
            }}
          />
          <p style={{ fontSize: "15px", color: "red" }}>{err}</p>
          <input
            type="submit"
            value="Register"
            className={`btn btn-lg btn-primary w-100 ${inter.className} mt-0`}
            onClick={(e) => {
              e.preventDefault();
              if (
                username.length === 0 ||
                password.length === 0 ||
                passwordConfirm.length === 0
              ) {
                setErr("You cannot leave any fields empty");
              } else {
                if (password !== passwordConfirm) {
                  setErr("The password do not match");
                } else {
                  fetch("/api/add-account", {
                    method: "POST",
                    body: JSON.stringify({
                      username: username,
                      password: password,
                    }),
                  })
                    .then((response) => response.json())
                    .then((res) => {
                      if (!res.success)
                        setErr("A user with the same name already exists");
                      else {
                        Router.push(
                          {
                            pathname: "/home",
                            query: {
                              username: username,
                            },
                          },
                          "/home"
                        );
                      }
                    });
                }
              }
            }}
          />
          <div
            style={{
              height: 12,
            }}
          />
          <Link href={"/login"} className={`${inter.className}`}>
            Already have an account? Click this to login.
          </Link>
        </div>
      </main>
    </>
  );
}
