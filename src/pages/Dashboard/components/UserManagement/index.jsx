import { useState } from 'react';
import { UserList } from './components/UserList/UserList';

export const UserManagement = () => {
  const [totalUser, setTotalUsers] = useState(0);
  return (
    <div className='container'>
      <h2 className='mb-4'>User Management</h2>
      <UserList setTotalUsers={setTotalUsers} />
    </div>
  );
};
