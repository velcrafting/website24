import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import UserForms from '../../components/UserFormsPage/UserForms';

const UserFormsPage = () => {
    const { currentUser } = useAuth();

    if (currentUser?.role !== 'admin' && currentUser?.role !== 'manager' && currentUser?.role !== 'user') {
      return <div>Access Denied</div>;
    }
  
  return <UserForms />;
};

export default UserFormsPage;
