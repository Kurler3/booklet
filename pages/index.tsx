import type { NextPage } from 'next';
import LoginRegisterBtns from '../components/HomePage/LoginRegisterBtns';
import client from '../utils/ApolloClient';
import { getAllUsersQuery } from '../graphql/users/queries';
import { useEffect } from 'react';
import useAuthStore from '../store/authStore';
import { UserType } from '../types/userTypes';
import MainPage from '../components/HomePage/MainPage';
import ReactTooltip from 'react-tooltip';

interface IProps {
  userProfile: UserType | null;
}


const Home: NextPage<IProps> = ({
  userProfile,
}) => {

  // AUTH STORE
  const {fetchAllUsers, allUsers} = useAuthStore();

  // SET ALL USERS
  useEffect(() => {
    if(allUsers === null) {
      fetchAllUsers();
    }
   
  }, [allUsers, fetchAllUsers]);


  useEffect(() => {
    ReactTooltip.rebuild();
  }, []);
  
  return (
    <div className='flex-1 h-full flex items-center justify-center'>

      {
        !userProfile ?

          (
            <LoginRegisterBtns />
          )

          :
          <MainPage 
            userProfile={userProfile}
          />
      }

    </div>
  )
}


export default Home
