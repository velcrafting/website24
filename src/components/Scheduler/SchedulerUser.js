import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const localizer = momentLocalizer(moment);

const SchedulerUser = () => {
  const { currentUser } = useAuth();
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [events, setEvents] = useState([]);
  const [meetingTypes, setMeetingTypes] = useState([
    { type: 'Phone Interview', duration: 15 },
    { type: 'Video Interview', duration: 30 },
    { type: 'Consultation', duration: 60 },
  ]);
  const [selectedMeetingType, setSelectedMeetingType] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'availableTimes'), (snapshot) => {
      const times = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAvailableTimes(times);
      const events = times.map(time => ({
        title: 'Meeting Times Available',
        start: new Date(time.startTime),
        end: new Date(time.endTime),
        id: time.id,
      }));
      setEvents(events);
    });

    return () => unsubscribe();
  }, []);

  const generateTimeSlots = (start, end, duration) => {
    const slots = [];
    let current = moment(start);

    while (current < moment(end)) {
      const slotEnd = current.clone().add(duration, 'minutes');
      if (slotEnd <= moment(end) && current.minutes() % 15 === 0) {
        slots.push(current.format('h:mm A'));
      }
      current.add(15, 'minutes');
    }
    return slots;
  };

  const handleSelectEvent = (event) => {
    const time = availableTimes.find(t => t.id === event.id);
    if (time) {
      setSelectedDate(time.startTime);
      const slots = generateTimeSlots(time.startTime, time.endTime, 15);
      setTimeSlots(slots);
      setOpenDialog(true);
    } else {
      toast.error('Selected time is not available.');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTime('');
    setSelectedDate(null);
    setUserInfo({ name: '', email: '' });
    setSelectedMeetingType('');
    setTimeSlots([]);
  };

  const handleConfirmBooking = async () => {
    try {
      if (selectedTime && selectedMeetingType) {
        const bookingStart = moment(`${selectedDate.split('T')[0]} ${selectedTime}`, 'YYYY-MM-DD h:mm A');
        const bookingEnd = bookingStart.clone().add(selectedMeetingType.duration, 'minutes');

        await addDoc(collection(db, 'bookings'), {
          userId: currentUser ? currentUser.uid : 'guest',
          userName: currentUser ? currentUser.displayName : userInfo.name,
          userEmail: currentUser ? currentUser.email : userInfo.email,
          startTime: bookingStart.toISOString(),
          endTime: bookingEnd.toISOString(),
          meetingType: selectedMeetingType.type,
        });
        toast.success('Meeting successfully booked!');
        handleCloseDialog();
      } else {
        toast.error('Please select a valid time slot and meeting type.');
      }
    } catch (error) {
      toast.error('An error occurred while booking the meeting.');
    }
  };

  return (
    <Box>
      <Typography variant="h4">Schedule a Meeting</Typography>
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        onSelectEvent={handleSelectEvent}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        style={{ height: '500px' }}
      />
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Confirm Booking</DialogTitle>
        <DialogContent>
          {selectedDate && (
            <>
              <Typography gutterBottom>{`Date: ${moment(selectedDate).format('MMMM Do YYYY')}`}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Time Slot</InputLabel>
                    <Select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }} // Limits the height of the dropdown
                      renderValue={(selected) => selected || 'Select a time slot'}
                    >
                      {timeSlots.map(slot => (
                        <MenuItem key={slot} value={slot}>{slot}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Meeting Type</InputLabel>
                    <Select
                      value={selectedMeetingType}
                      onChange={(e) => setSelectedMeetingType(e.target.value)}
                      renderValue={(selected) => selected?.type || 'Select a meeting type'}
                    >
                      {meetingTypes.map(type => (
                        <MenuItem key={type.type} value={type}>{type.type} ({type.duration} minutes)</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {!currentUser && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Name"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email"
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        fullWidth
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmBooking} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Box>
  );
};

export default SchedulerUser;
