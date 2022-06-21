/* eslint-disable no-console */
export const ProtectRoute = (WrappedComponent) => {
  const tokenString = localStorage.getItem('user_token');
  console.log(tokenString);
  if (!tokenString) {
    window.location.href = '/login';
  }
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const tokenString = localStorage.getItem('user_token');
  //   // eslint-disable-next-line no-console
  //   console.log(tokenString);
  //   if (!tokenString) {
  //     // navigate('/login');
  //     window.location.href = '/login';
  //   } else {
  //     dispatch(fetchUser());
  //   }
  // }, [dispatch]);

  return function Wrapper(props) {
    // eslint-disable-next-line react/react-in-jsx-scope, react/jsx-props-no-spreading
    return <WrappedComponent {...props} />;
  };
};
