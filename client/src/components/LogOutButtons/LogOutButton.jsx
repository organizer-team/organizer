import React,{useContext} from 'react'
import { UserContext } from '../../context/UserContext';
import removeTokenCookie from '../../utils/removeToken';

const LogOutButton = () => {
  const { setToken } = useContext(UserContext);
  return (
    <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          removeTokenCookie();
          setToken(null);
        }}
      >
        Log Out
      </button>
  )
}

export default LogOutButton