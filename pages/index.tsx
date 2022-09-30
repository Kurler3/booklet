import type { NextPage } from 'next';
import { IUser } from '../types/userTypes';
import Link from 'next/link';
import {
  BiLogIn
} from 'react-icons/bi';
import {
  VscAccount
} from 'react-icons/vsc';
import LoginRegisterBtns from '../components/HomePage/LoginRegisterBtns';


interface IProps {
  userProfile: IUser | null;
}

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

const Home: NextPage<IProps> = ({
  userProfile,
}) => {

  return (
    <div className='flex-1 h-full flex items-center justify-center'>

      {
        !userProfile ?

          (
            <LoginRegisterBtns />
          )

          :
          <div>Logged in!</div>
      }

    </div>
  )
}

export default Home
