import Layout from "@/components/Layout";
import Sidebar from "@/features/SideBar";
import RoomWindow from "@/features/RoomWindow";
import UserContextProvider from "@/context/UserContext";
import RoomContextProvider from "@/context/RoomContext";
import { getTokenCookie, removeTokenCookie } from "@/lib/authCookies";
import { redirect } from "@/utils/serverProps";
import { API_URL } from "@/config";
import { fetcher } from "@/lib/fetcher";

// Types
import { TUser } from "@/types";
import { GetServerSidePropsContext } from "next";

const Home = ({ user }: { user: TUser }) => {
  return (
    <UserContextProvider user={user}>
      <RoomContextProvider>
        <Layout>
          <Sidebar />
          <RoomWindow />
        </Layout>
      </RoomContextProvider>
    </UserContextProvider>
  );
};

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const token = getTokenCookie(req);
  if (!token) return redirect("/landing");

  const response = await fetcher<{ data: TUser }>(
    `${API_URL}/api/auth/currentUser`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (response.success) {
    return {
      props: {
        user: JSON.parse(JSON.stringify(response.data)),
      },
    };
  } else {
    // Token in cookies is invalid, remove it
    removeTokenCookie(res);
    return redirect("/landing");
  }
};

export default Home;
