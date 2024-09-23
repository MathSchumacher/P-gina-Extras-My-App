import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const useNavigation = () => {
  const [historyStack, setHistoryStack] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Push the current path into historyStack whenever location changes
    setHistoryStack((prevHistoryStack) => [...prevHistoryStack, location.pathname]);
  }, [location]);

  const popHistory = () => {
    setHistoryStack((prevHistoryStack) => prevHistoryStack.slice(0, -1));
  };

  return {
    historyStack,
    popHistory,
    navigate,
  };
};
