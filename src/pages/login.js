import { useState } from "react";
import { useRouter } from "next/router";
import useAuth from "@/lib/hooks/useAuth";

import styles from "../styles/app.module.css";

const handleLogin = async (email, password) => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();

  if (data.success) {
    return;
  }

  throw new Error("Wrong email or password");
};

const Home = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState(null);
  const { isLoading, loggedIn } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    setLoginError(null);
    handleLogin(email.value, password.value)
      .then(() => router.push("/protected-route"))
      .catch((err) => setLoginError(err.message));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isLoading && loggedIn) {
    router.push("/protected-route");
    return null;
  }

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" />

        <button type="submit">Login</button>

        {loginError && <div className={styles.formError}>{loginError}</div>}
      </form>
    </div>
  );
};

export default Home;
