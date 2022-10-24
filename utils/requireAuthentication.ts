import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { BaseAuthStore, User } from "pocketbase";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { getToken, encode } from "next-auth/jwt";
import { pocketBase } from "../services/pocketBaseService";

type Callback = (accessToken: string, user: User) => Promise<any>;

class AuthStore extends BaseAuthStore {
  constructor(token: string, user: User) {
    super();
    this.save(token, user);
  }
}

const secret = process.env.NEXTAUTH_SECRET;

export const requireAuthentication = async (
  ctx: GetServerSidePropsContext<any, any>,
  cb: Callback
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
  let userSession = session as any;
  const store = new AuthStore(userSession.accessToken, userSession.user);
  pocketBase.client.authStore = store;
  return cb(userSession.accessToken, userSession.user);
};
