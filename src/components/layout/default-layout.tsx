import { useAppContext } from '@/store';
import React, { ReactNode, useEffect } from 'react';
import { Button } from '../input/button';
import { appConfig } from '@/utils/app-config';
import { Link, useNavigate } from 'react-router-dom';
import { QueryKey } from '@/utils/helper/query-key';
import { AuthApiRepository } from '@/data/auth/auth-repository-api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../Loader/loading';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userRepo = new AuthApiRepository();

  const { data, isSuccess, isLoading, error } = useQuery({
    queryKey: [QueryKey.userDetail],
    queryFn: () => userRepo.getme(),
    retry: false,
    staleTime: Infinity, // make this query run only once, except reload the browser
  })

  useEffect(() => {
    if (data && isSuccess) {
      dispatch({ type: "SET_USER", payload: { user_id: data.user_id, username: data.username, email: data.email, isGuest: false } })
    }
  }, [data])

  useEffect(() => {
    // if user is not guest and got some error, remove local storage and redirect to signin page
    if (!state.user.isGuest && error) {
      localStorage.removeItem(`${appConfig.localStorageName}`)
      navigate("/auth/signin")
    }
  }, [, error])

  const onLogout = () => {
    localStorage.removeItem(`${appConfig.localStorageName}`)
    queryClient.removeQueries({ queryKey: [QueryKey.userDetail] })
    queryClient.removeQueries({ queryKey: [QueryKey.getAllTodo] })
    dispatch({ type: "RESET" })
    navigate("/auth/signin")
  }

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">

      {/* NAVBAR */}
      <header className='border-b-2 border-black'>
        <nav className="flex items-center px-4 py-2">
          <div className="flex space-x-4 mx-auto">
            <Link to="/" className="text-gray-700 hover:text-blue-500">Task</Link>
            <Link to="/profile" className="text-gray-700 hover:text-blue-500">Profile</Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-gray-700 font-medium">
              Hello {state?.user?.username || "Guest"}
            </div>
            <Button
              onClick={onLogout}
              className=""
              variant={`ghost`}
            >
              Logout
            </Button>
          </div>
        </nav>
      </header>

      {isLoading ? <Loading className='min-h-[28rem]' /> : children}
    </div>
  );
};

export default DefaultLayout;
