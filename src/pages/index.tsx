import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import styles from "@/styles/Home.module.css";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { withSSRGuests } from "@/utils/withSSRGuests";

export default function Home() {
  const { isAuthenticated, signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = {
      email,
      password,
    };

    await signIn(data);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Entrar</button>
    </form>
  );
}

export const getServerSideProps = withSSRGuests(async (ctx) => {
  return {
    props: {},
  };
});
