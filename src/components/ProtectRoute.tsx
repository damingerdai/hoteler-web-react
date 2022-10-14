import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProtectRoute = (WrappedComponent) => function Wrapper(props) {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const checkToken = async () => {
    const token = localStorage.getItem('user_token');
    if (!token) {
      navigate('/login');
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);

  if (!authenticated) {
    return null;
  }

  // eslint-disable-next-line react/react-in-jsx-scope, react/jsx-props-no-spreading
  return <WrappedComponent {...props} />;
};
