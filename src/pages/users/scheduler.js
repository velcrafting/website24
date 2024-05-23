import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import SchedulerAdmin from '../../components/Scheduler/SchedulerAdmin';
import SchedulerUser from '../../components/Scheduler/SchedulerUser';

const SchedulerPage = () => {
  const { currentUser } = useAuth();
  const [viewAsUser, setViewAsUser] = useState(false);

  if (!currentUser) {
    // Visitor view
    return <SchedulerUser />;
  }

  if (currentUser.role !== 'admin' && currentUser.role !== 'manager' && currentUser.role !== 'user') {
    return <div>Access Denied</div>;
  }

  if (currentUser.role === 'admin' || currentUser.role === 'manager') {
    return (
      <div>
        <button onClick={() => setViewAsUser(!viewAsUser)}>
          {viewAsUser ? 'Switch to Admin View' : 'Switch to User View'}
        </button>
        {viewAsUser ? <SchedulerUser /> : <SchedulerAdmin />}
      </div>
    );
  }

  // User view
  return <SchedulerUser />;
};

export default SchedulerPage;
