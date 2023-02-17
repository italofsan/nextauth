import { AuthTokenError } from "@/services/errors/AuthTokenError";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { destroyCookie, parseCookies } from "nookies";

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    if (!cookies["nextauth.token"]) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    try {
      return await fn(ctx);
    } catch (error) {
      if (error instanceof AuthTokenError) {
        destroyCookie(ctx, "nextauth.token");
        destroyCookie(ctx, "nextauth.refreshToken");

        return {
          redirect: { destination: "/", permanent: false },
        };
      }
    }

    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  };
}

// export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
//   return async (
//     ctx: GetServerSidePropsContext
//   ): Promise<GetServerSidePropsResult<P>> => {
//     const cookies = parseCookies(ctx);
//     if (!cookies["nextauth.token"]) {
//       return {
//         redirect: {
//           destination: "/",
//           permanent: false,
//         },
//       };
//     }

//     return await fn(ctx);
//   };
// }
