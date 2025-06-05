import React, { useEffect, useState } from 'react';
import { useHistory ,useLocation} from "react-router";
import authServices from '../../../services/authServices.js';

const ConfirmAccount = () => {
  const location = useLocation();
  const history = useHistory();
  const [loading] = useState(true);
  const [setAlertMessage] = useState('');

  useEffect(() => {
    const getTokenFromURL = () => {
      const params = new URLSearchParams(location.search);
      return params.get('token');
    };
    const token = getTokenFromURL();
    const confirmAccount = async () => {
      try {
        const result = await authServices.confirmClientAccount(token);
        history.push('/presentation', { alertMessage: result.data.header.message });
      } catch (error) {
        history.push('/presentation', { alertMessage: 'An error occurred. Please try again later.' });
      }
    };

    confirmAccount();
  }, [history, location.search, setAlertMessage]);

  return (
    <div>
      {loading && (
        <div className="alert alert-info" role="alert">
          Confirmation du compte en cours ...
        </div>
      )}
    </div>
  );
};

export default ConfirmAccount;
