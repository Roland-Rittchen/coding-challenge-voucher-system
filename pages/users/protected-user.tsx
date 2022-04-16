import { GetServerSidePropsContext } from 'next';
import Layout from '../../components/Layout';
import { getUserByValidSessionToken } from '../../util/database';

type Props = {
  userObject: { username: string };
  user: { id: number; username: string };
};
export default function ProtectedUser(props: Props) {
  return (
    <Layout userObject={props.userObject}>
      <h1>you only will see this if are logged in</h1>
      <div> user id is {props.user.id}</div>
      <div> user name is {props.user.username}</div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // 1. Get a user from the cookie sessionToken
  const token = context.req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(token);

  // 2. If there is a user, return that and render page
  if (user) {
    return {
      props: { user: user },
    };
  }

  // 3. Otherwise redirect to login
  return {
    redirect: {
      destination: `/login?returnTo=/users/protected-user`,
      permanent: false,
    },
  };
}
