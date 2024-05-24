import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { authContext } from './context';

const ProtectedRoute = ({ element, ...rest }) => {
  const navigate = useNavigate();
  const { auth } = useContext(authContext);
  const location = useLocation();

  useEffect(() => {
    if (!auth) {
      navigate('/login', { state: { from: location } });
    }
  }, [auth, navigate, location]);

  return auth ? element : null;
};

export default ProtectedRoute;
