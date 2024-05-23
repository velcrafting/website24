import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import MyKanban from '../../components/Kanban/Kanban';

const KanbanPage = () => {
  const { currentUser } = useAuth();

  if (currentUser?.role !== 'admin' && currentUser?.role !== 'manager') {
    return <div>Access Denied</div>;
  }

  return <MyKanban />;
};

export default KanbanPage;
