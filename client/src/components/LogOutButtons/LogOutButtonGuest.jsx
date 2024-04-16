import React,{useContext, useEffect} from 'react'
import PropTypes from 'prop-types';
import { UserContext } from '../../context/UserContext';
import removeTokenCookie from '../../utils/removeToken';
import useFetch from '../../hooks/useFetch';


const LogOutButtonGuest = ({ userId }) => {
  const { setToken } = useContext(UserContext);

  const {cancelFetch, performFetch} = useFetch('/user/delete', (jsonResult) => {
    if (jsonResult.success) {
      removeTokenCookie();
      setToken(null);
    } else {
      alert('Failed to log out');
    }
  });

  useEffect(() =>{
    return cancelFetch
  },[]);

  const handleDelete = (userId) => {
    performFetch({
      method: 'DELETE',
      body: JSON.stringify({ user: { id: userId, password:'qweQWE123!' } }),
      credentials: 'include', // save cookies inside react app
    });
  };

  return (
    <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          handleDelete(userId);
        }}
      >
        I want an account
      </button>
  )
}

LogOutButtonGuest.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default LogOutButtonGuest