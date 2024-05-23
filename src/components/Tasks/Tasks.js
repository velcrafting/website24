import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../../firebase';
import { collection, addDoc, onSnapshot, updateDoc, doc, query, where } from 'firebase/firestore';
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Grid, List, ListItem, ListItemText } from '@mui/material';
import { toast } from 'react-toastify';

const MyTasks = () => {
  const { currentUser } = useAuth();
  const [taskData, setTaskData] = useState({ title: '', description: '', status: 'Not Started', dueDate: '', remindMe: false });
  const [tags, setTags] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const q = query(collection(db, 'tasks'), where('userId', '==', currentUser.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const userTasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTasks(userTasks);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleTagChange = (event) => {
    setTags(event.target.value);
  };

  const handleCheckboxChange = (e) => {
    setTaskData({ ...taskData, remindMe: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentUser) {
      const newTask = {
        ...taskData,
        tags,
        userId: currentUser.uid,
      };
      await addDoc(collection(db, 'tasks'), newTask);
      setTaskData({ title: '', description: '', status: 'Not Started', dueDate: '', remindMe: false });
      setTags([]);
      toast.success('Task added successfully!');
    }
  };

  const handleTaskClick = async (task) => {
    // Logic for editing a task
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Typography variant="h6">Create New Task</Typography>
          <TextField label="Title" name="title" fullWidth margin="normal" onChange={handleChange} value={taskData.title} />
          <TextField label="Description" name="description" fullWidth margin="normal" onChange={handleChange} value={taskData.description} />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select name="status" value={taskData.status} onChange={handleChange}>
              <MenuItem value="Not Started">Not Started</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Due Date" name="dueDate" type="date" fullWidth margin="normal" onChange={handleChange} InputLabelProps={{ shrink: true }} value={taskData.dueDate} />
          <FormControlLabel
            control={<Checkbox checked={taskData.remindMe} onChange={handleCheckboxChange} />}
            label="Remind me"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Add Task</Button>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6">Your Tasks</Typography>
        <List>
          {tasks.map(task => (
            <ListItem key={task.id} button onClick={() => handleTaskClick(task)}>
              <ListItemText primary={task.title} secondary={task.dueDate} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default MyTasks;
