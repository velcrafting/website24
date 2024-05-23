import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { Box, Card, CardContent, CardMedia, Typography, CircularProgress, Container, Grid } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchBlogs = async () => {
        const querySnapshot = await getDocs(collection(db, 'blogs'));
        const blogsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBlogs(blogsData);
        setLoading(false);
      };
      fetchBlogs();
    }, []);
  
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      );
    }
  
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Blog Posts
        </Typography>
        <Grid container spacing={4}>
          {blogs.map((blog) => (
            <Grid item key={blog.id} xs={12} sm={6} md={4}>
              <Card>
                {blog.image && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={blog.image}
                    alt={blog.title}
                  />
                )}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {blog.title}
                  </Typography>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {blog.content.substring(0, 100) + '...'}
                  </ReactMarkdown>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  };
  
export default Blog;
