import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { BaseAuthStore } from "pocketbase";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { getToken, encode } from "next-auth/jwt";
import { pocketBase } from "../services/pocketBaseService";

class AuthStore extends BaseAuthStore {
  _token: string;

  constructor(token: string) {
    super();
    this._token = token;
  }

  get token(): string {
    return this._token;
  }
}

const secret = process.env.NEXTAUTH_SECRET;

export const requireAuthentication = async (
  ctx: GetServerSidePropsContext<any, any>,
  cb: any
) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  pocketBase.client.authStore = new AuthStore((session as any).accessToken);
  return cb(session);
};
