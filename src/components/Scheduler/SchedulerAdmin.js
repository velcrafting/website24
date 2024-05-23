import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../../firebase';
import { collection, query, where, onSnapshot, addDoc } from 'firebase/firestore';
import { Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem, DialogContentText, Grid } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import debounce from 'lodash.debounce';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const localizer = momentLocalizer(moment);

const debouncedAddDoc = debounce(async (newDoc) => {
  try {
    await addDoc(collection(db, newDoc.type === 'Task' ? 'tasks' : 'bookings'), newDoc);
    toast.success(`${newDoc.type} added successfully!`);
  } catch (error) {
    console.error(`Error adding ${newDoc.type.toLowerCase()}:`, error);
    toast.error(`Failed to add ${newDoc.type.toLowerCase()}. Please try again.`);
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

const meetingTypes = [
  { type: 'Phone Interview', duration: 15 },
  { type: 'Video Interview', duration: 30 },
  { type: 'Consultation', duration: 60 },
];

const MyCalendar = ({ classes }) => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasksAndBookings, setTasksAndBookings] = useState([]);
  const [openDayDialog, setOpenDayDialog] = useState(false);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [newDoc, setNewDoc] = useState({ type: 'Booking', title: '', description: '', status: 'Not Started', dueDate: '', startTime: '', endTime: '', meetingType: '' });

  useEffect(() => {
    if (currentUser) {
      const qTasks = query(collection(db, 'tasks'), where('userId', '==', currentUser.uid));
      const qBookings = query(collection(db, 'bookings'), where('userId', '==', currentUser.uid));
      
      const unsubscribeTasks = onSnapshot(qTasks, (snapshot) => {
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
      });

      const unsubscribeBookings = onSnapshot(qBookings, (snapshot) => {
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
      });

      setLoading(false);
      
      return () => {
        unsubscribeTasks();
        unsubscribeBookings();
      };
    }
  }, [currentUser]);

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    loadTasksAndBookingsForDate(start);
    setOpenDayDialog(true);
  };

  const handleEventClick = (event) => {
    setSelectedDate(event.start);
    loadTasksAndBookingsForDate(event.start);
    setOpenDayDialog(true);
  };

  const loadTasksAndBookingsForDate = (date) => {
    if (currentUser) {
      const dateStr = moment(date).format('YYYY-MM-DD');
      const qTasks = query(collection(db, 'tasks'), where('userId', '==', currentUser.uid), where('dueDate', '==', dateStr));
      const qBookings = query(collection(db, 'bookings'), where('startTime', '>=', `${dateStr}T00:00:00`), where('endTime', '<=', `${dateStr}T23:59:59`));

      const tasks = [];
      const bookings = [];

      const unsubscribeTasks = onSnapshot(qTasks, (snapshot) => {
        snapshot.forEach(doc => tasks.push(doc.data()));
      });

      const unsubscribeBookings = onSnapshot(qBookings, (snapshot) => {
        snapshot.forEach(doc => bookings.push(doc.data()));
      });

      Promise.all([unsubscribeTasks, unsubscribeBookings]).then(() => {
        setTasksAndBookings([...tasks, ...bookings]);
      });
    }
  };

  const handleCloseDayDialog = () => {
    setOpenDayDialog(false);
    setSelectedDate(null);
    setTasksAndBookings([]);
  };

  const handleOpenTaskDialog = () => {
    setNewDoc({ ...newDoc, dueDate: moment(selectedDate).format('YYYY-MM-DD') });
    setOpenTaskDialog(true);
  };

  const handleCloseTaskDialog = () => {
    setOpenTaskDialog(false);
    setNewDoc({ type: 'Booking', title: '', description: '', status: 'Not Started', dueDate: '', startTime: '', endTime: '', meetingType: '' });
  };

  const handleSaveDoc = async () => {
    if (currentUser) {
      const docData = {
        ...newDoc,
        userId: currentUser.uid,
        ...(newDoc.type === 'Task' && { dueDate: moment(selectedDate).format('YYYY-MM-DD') }),
        ...(newDoc.type === 'Booking' && {
          startTime: moment(`${newDoc.dueDate} ${newDoc.startTime}`, 'YYYY-MM-DD h:mm A').toISOString(),
          endTime: moment(`${newDoc.dueDate} ${newDoc.endTime}`, 'YYYY-MM-DD h:mm A').toISOString(),
        }),
      };
      debouncedAddDoc(docData);
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
          style={{ height: '100%', width: '100%' }}
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

      <Dialog open={openDayDialog} onClose={handleCloseDayDialog} maxWidth="lg" fullWidth>
        <DialogTitle>Tasks and Bookings for {moment(selectedDate).format('MMMM Do YYYY')}</DialogTitle>
        <DialogContent>
          {tasksAndBookings.map((item, index) => (
            <Box key={index} mb={2}>
              <Typography variant="h6">{item.title || item.meetingType}</Typography>
              <Typography variant="body1">
                {item.dueDate ? `Due Date: ${item.dueDate}` : `Start: ${moment(item.startTime).format('h:mm A')}, End: ${moment(item.endTime).format('h:mm A')}`}
              </Typography>
              {item.description && <Typography variant="body1">Description: {item.description}</Typography>}
            </Box>
          ))}
          <Button onClick={handleOpenTaskDialog} color="primary" variant="contained">Add Task or Booking</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDayDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openTaskDialog} onClose={handleCloseTaskDialog} maxWidth="md" fullWidth>
        <DialogTitle>Add New Task or Booking</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Type</InputLabel>
                <Select
                  value={newDoc.type}
                  onChange={(e) => setNewDoc({ ...newDoc, type: e.target.value })}
                  renderValue={(selected) => selected || 'Select a type'}
                >
                  <MenuItem value="Task">Task</MenuItem>
                  <MenuItem value="Booking">Booking</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {newDoc.type === 'Booking' && (
              <>
                <Grid item xs={6}>
                  <TextField
                    label="Start Time"
                    type="time"
                    fullWidth
                    value={newDoc.startTime}
                    onChange={(e) => setNewDoc({ ...newDoc, startTime: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="End Time"
                    type="time"
                    fullWidth
                    value={newDoc.endTime}
                    onChange={(e) => setNewDoc({ ...newDoc, endTime: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Meeting Type</InputLabel>
                    <Select
                      value={newDoc.meetingType}
                      onChange={(e) => setNewDoc({ ...newDoc, meetingType: e.target.value })}
                      renderValue={(selected) => selected || 'Select a meeting type'}
                    >
                      {meetingTypes.map(type => (
                        <MenuItem key={type.type} value={type.type}>{type.type} ({type.duration} minutes)</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                label="Title"
                name="title"
                fullWidth
                margin="normal"
                value={newDoc.title}
                onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
              />
            </Grid>
            {newDoc.type === 'Task' && (
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  fullWidth
                  margin="normal"
                  value={newDoc.description}
                  onChange={(e) => setNewDoc({ ...newDoc, description: e.target.value })}
                />
              </Grid>
            )}
            {newDoc.type === 'Task' && (
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={newDoc.status}
                    onChange={(e) => setNewDoc({ ...newDoc, status: e.target.value })}
                  >
                    <MenuItem value="Not Started">Not Started</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTaskDialog}>Cancel</Button>
          <Button onClick={handleSaveDoc}>Save</Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Box>
  );
};

export default withStyles(styles)(MyCalendar);
