import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import FormBuilder from '../../components/Builders/FormBuilder';

const FormBuilderPage = () => {
    const { currentUser } = useAuth();

    if (currentUser?.role !== 'admin' && currentUser?.role !== 'manager') {
      return <div>Access Denied</div>;
    }
  
    return (
      <div>
        <FormBuilder />
      </div>
    );
  };
  
  export default FormBuilderPage;