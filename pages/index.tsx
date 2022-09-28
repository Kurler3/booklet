import type { NextPage } from 'next';
import { getAllUsersQuery } from '../graphql/users/queries';
import apolloClient from '../utils/ApolloClient';



// GET ALL USERS TEST 
export async function getServerSideProps() {

  // const {data} = await apolloClient.query({
  //   query: getAllUsersQuery
  // });

  // console.log('Data: ', data);
  return {
    props: {

    }
  }
  // return {
  //   props: {
  //     allUsers:
  //   }
  // }
}

const Home: NextPage = () => {
  return (
    <div>
      Main Content!
    </div>
  )
}

export default Home
