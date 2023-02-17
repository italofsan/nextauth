import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";

import { withSSRAuth } from "@/utils/withSSRAuth";
import { api } from "@/services/apiClient";
import { setupAPIClient } from "@/services/api";
import { destroyCookie } from "nookies";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get("/me").then((response) => console.log("RESPONSE", response));
  }, []);

  return <h1>Dashboard: {user.email}</h1>;
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/me");

  console.log(response.data);

  return {
    props: {},
  };
});

// export const getServerSideProps = withSSRAuth(async (ctx) => {
//   const apiClient = setupAPIClient(ctx);
//   try {
//     const response = await apiClient.get("/me");

//     // console.log("RESPONSE", response.data);
//   } catch (error) {
//     destroyCookie(ctx, "nextauth.token");
//     destroyCookie(ctx, "nextauth.refreshToken");
//     // console.log(error);

//     return {
//       redirect: { destination: "/", permanent: false },
//     };
//   }

//   return {
//     props: {},
//   };
// });
