import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../../firebase';
import { collection, query, where, onSnapshot, addDoc } from 'firebase/firestore';
import { Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem, DialogContentText } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import debounce from 'lodash.debounce';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const localizer = momentLocalizer(moment);

const debouncedAddDoc = debounce(async (newTaskWithUser) => {
  try {
    await addDoc(collection(db, 'tasks'), newTaskWithUser);
    toast.success('Task added successfully!');
  } catch (error) {
    console.error('Error adding task:', error);
    toast.error('Failed to add task. Please try again.');
  }
}, 1000); // Add debounce to reduce write frequency

const styles = {
  calendar: {
    height: 'calc(100vh - 100px)', // Adjust the height for better responsiveness
    margin: '0 auto',
    padding: '20px',
  },
  event: {
    backgroundColor: (event) => {
      switch (event.status) {
        case 'Not Started':
          return 'lightcoral';
        case 'In Progress':
          return 'lightyellow';
        case 'Completed':
          return 'lightgreen';
        case 'Booked':
          return 'lightblue';
        default:
          return 'lightgray';
      }
    },
    borderRadius: '5px',
    color: 'black',
    padding: '5px',
    border: '1px solid #ccc',
    display: 'block',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
};

const MyCalendar = ({ classes }) => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'Not Started', dueDate: '' });
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const q = query(collection(db, 'tasks'), where('userId', '==', currentUser.uid));
      const unsubscribeTasks = onSnapshot(q, (snapshot) => {
        const tasks = snapshot.docs.map(doc => doc.data());
        const taskEvents = tasks
          .filter(task => task.dueDate)
          .map(task => ({
            title: task.title,
            start: new Date(moment(task.dueDate).startOf('day').toDate()),
            end: new Date(moment(task.dueDate).endOf('day').toDate()),
            status: task.status,
          }));
        setEvents(prevEvents => [...prevEvents, ...taskEvents]);
        setLoading(false);
      });

      const unsubscribeBookings = onSnapshot(collection(db, 'bookings'), (snapshot) => {
        const bookings = snapshot.docs.map(doc => doc.data());
        const bookingEvents = bookings
          .filter(booking => booking.startTime && booking.endTime)
          .map(booking => ({
            title: booking.meetingType,
            start: new Date(booking.startTime),
            end: new Date(booking.endTime),
            status: 'Booked',
          }));
        setEvents(prevEvents => [...prevEvents, ...bookingEvents]);
        setLoading(false);
      });

      return () => {
        unsubscribeTasks();
        unsubscribeBookings();
      };
    }
  }, [currentUser]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setOpenEventDialog(true);
  };

  const handleCloseEventDialog = () => {
    setOpenEventDialog(false);
    setSelectedEvent(null);
  };

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setSelectedDate(null);
  };

  const handleConfirmCreateTask = () => {
    setNewTask((prevState) => ({
      ...prevState,
      dueDate: moment(selectedDate).format('YYYY-MM-DD')
    }));
    setOpenConfirmDialog(false);
    setOpenTaskDialog(true);
  };

  const handleCloseTaskDialog = () => {
    setOpenTaskDialog(false);
    setNewTask({ title: '', description: '', status: 'Not Started', dueDate: '' });
  };

  const handleSaveTask = async () => {
    if (currentUser) {
      const newTaskWithUser = { ...newTask, userId: currentUser.uid };
      debouncedAddDoc(newTaskWithUser);
      handleCloseTaskDialog();
    }
  };

  return (
    <Box className={classes.calendar}>
      {loading ? (
        <CircularProgress className={classes.loading} />
      ) : (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectEvent={handleEventClick}
          onSelectSlot={handleSelectSlot}
          style={{ height: '100%' }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: styles.event.backgroundColor(event),
              borderRadius: styles.event.borderRadius,
              color: styles.event.color,
              padding: styles.event.padding,
              border: styles.event.border,
            },
          })}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        />
      )}

      <Dialog open={openEventDialog} onClose={handleCloseEventDialog}>
        <DialogTitle>Event Details</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <>
              <Typography variant="h6">{selectedEvent.title}</Typography>
              <Typography variant="body1">
                Start: {selectedEvent.start.toLocaleString()}
              </Typography>
              <Typography variant="body1">
                End: {selectedEvent.end.toLocaleString()}
              </Typography>
              <Typography variant="body1">
                Status: {selectedEvent.status}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEventDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Create Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to create a task for {moment(selectedDate).format('MMMM Do YYYY')}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>No</Button>
          <Button onClick={handleConfirmCreateTask} color="primary">Yes</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openTaskDialog} onClose={handleCloseTaskDialog}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField label="Title" name="title" fullWidth margin="normal" onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
          <TextField label="Description" name="description" fullWidth margin="normal" onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
          <TextField label="Due Date" name="dueDate" type="date" fullWidth margin="normal" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} InputLabelProps={{ shrink: true }} />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select name="status" value={newTask.status} onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}>
              <MenuItem value="Not Started">Not Started</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTaskDialog}>Cancel</Button>
          <Button onClick={handleSaveTask}>Save</Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Box>
  );
};

export default withStyles(styles)(MyCalendar);
