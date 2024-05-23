// import React, { useState, useEffect } from 'react';
// import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from 'firebase/firestore';
// import { db } from '../../../firebase';
// import { Box, Typography, Button } from '@mui/material';
// import PageEditor from '../Editors/PageEditor';
// import PageList from '../Lists/PageList';

// const PageBuilder = () => {
//   const [pages, setPages] = useState([]);
//   const [currentPage, setCurrentPage] = useState(null);
//   const [editMode, setEditMode] = useState(false);

//   useEffect(() => {
//     const fetchPages = async () => {
//       const querySnapshot = await getDocs(collection(db, 'pages'));
//       const pagesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setPages(pagesData);
//     };
//     fetchPages();
//   }, []);

//   const handleSavePage = async (page) => {
//     if (editMode) {
//       await updateDoc(doc(db, 'pages', page.id), page);
//     } else {
//       await addDoc(collection(db, 'pages'), page);
//     }
//     setCurrentPage(null);
//     setEditMode(false);
//   };

//   const handleEditPage = (page) => {
//     setCurrentPage(page);
//     setEditMode(true);
//   };

//   const handleDeletePage = async (id) => {
//     await deleteDoc(doc(db, 'pages', id));
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <Box sx={{ flex: 1, p: 2 }}>
//         <Typography variant="h6">Create/Edit Page</Typography>
//         <PageEditor page={currentPage} onSave={handleSavePage} />
//       </Box>
//       <Box sx={{ flex: 1, p: 2 }}>
//         <PageList pages={pages} onEdit={handleEditPage} onDelete={handleDeletePage} />
//       </Box>
//     </Box>
//   );
// };

// export default PageBuilder;
