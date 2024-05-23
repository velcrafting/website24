// import React, { useState, useEffect } from 'react';
// import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from 'firebase/firestore';
// import { Box, Typography } from '@mui/material';
// import { db, auth } from '../../../firebase';
// import UserCreator from '../Forms/UserCreator';
// import UserList from '../Lists/UserList';

// const UserBuilder = () => {
//   const [users, setUsers] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [editMode, setEditMode] = useState(false);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const querySnapshot = await getDocs(collection(db, 'users'));
//       const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setUsers(usersData);
//     };
//     fetchUsers();
//   }, []);

//   const handleSaveUser = async (user) => {
//     if (editMode) {
//       await updateDoc(doc(db, 'users', user.id), user);
//     } else {
//       const userRef = await addDoc(collection(db, 'users'), user);
//       const newUser = { ...user, id: userRef.id };
//       setUsers([...users, newUser]);
//     }
//     setCurrentUser(null);
//     setEditMode(false);
//   };

//   const handleEditUser = (user) => {
//     setCurrentUser(user);
//     setEditMode(true);
//   };

//   const handleDeleteUser = async (id) => {
//     await deleteDoc(doc(db, 'users', id));
//     setUsers(users.filter(user => user.id !== id));
//   };

//   const handleResetPassword = async (email) => {
//     await auth.sendPasswordResetEmail(email);
//     alert(`Password reset email sent to ${email}`);
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <Box sx={{ flex: 1, p: 2 }}>
//         <Typography variant="h6">Create/Edit User</Typography>
//         <UserCreator user={currentUser} onSave={handleSaveUser} />
//       </Box>
//       <Box sx={{ flex: 1, p: 2 }}>
//         <UserList users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} onResetPassword={handleResetPassword} />
//       </Box>
//     </Box>
//   );
// };

// export default UserBuilder;
