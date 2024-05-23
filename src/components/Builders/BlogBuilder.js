// import React, { useState, useEffect } from 'react';
// import { db, storage } from '../../../firebase';
// import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { Box, Button, TextField, Typography } from '@mui/material';
// import BlogList from '../Lists/BlogList';
// import MarkdownEditor from '../Editors/MarkdownEditor';

// const BlogBuilder = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [currentBlog, setCurrentBlog] = useState({ title: '', content: '', image: '' });
//   const [editMode, setEditMode] = useState(false);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       const querySnapshot = await getDocs(collection(db, 'blogs'));
//       const blogsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setBlogs(blogsData);
//     };
//     fetchBlogs();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentBlog({ ...currentBlog, [name]: value });
//   };

//   const handleImageUpload = async (file) => {
//     const imageRef = ref(storage, `blogImages/${file.name}`);
//     await uploadBytes(imageRef, file);
//     const imageUrl = await getDownloadURL(imageRef);
//     setCurrentBlog({ ...currentBlog, image: imageUrl });
//   };

//   const handleSave = async () => {
//     if (editMode) {
//       await updateDoc(doc(db, 'blogs', currentBlog.id), currentBlog);
//     } else {
//       await addDoc(collection(db, 'blogs'), currentBlog);
//     }
//     setCurrentBlog({ title: '', content: '', image: '' });
//     setEditMode(false);
//   };

//   const handleEdit = (blog) => {
//     setCurrentBlog(blog);
//     setEditMode(true);
//   };

//   const handleDelete = async (id) => {
//     await deleteDoc(doc(db, 'blogs', id));
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <Box sx={{ flex: 1, p: 2 }}>
//         <Typography variant="h6">Create/Edit Blog</Typography>
//         <TextField
//           label="Title"
//           name="title"
//           value={currentBlog.title}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <MarkdownEditor
//           value={currentBlog.content}
//           onChange={(content) => setCurrentBlog({ ...currentBlog, content })}
//         />
//         <Button variant="contained" component="label">
//           Upload Image
//           <input type="file" hidden onChange={(e) => handleImageUpload(e.target.files[0])} />
//         </Button>
//         <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
//           Save Blog
//         </Button>
//       </Box>
//       <Box sx={{ flex: 1, p: 2 }}>
//         <BlogList blogs={blogs} onEdit={handleEdit} onDelete={handleDelete} />
//       </Box>
//     </Box>
//   );
// };

// export default BlogBuilder;
