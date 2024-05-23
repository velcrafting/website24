import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent, CardActions, Grid } from '@mui/material';
import { formatDistanceToNow, isValid } from 'date-fns';
import FormRenderer from './FormRenderer';

const UserForms = () => {
  const [forms, setForms] = useState([]);
  const [currentForm, setCurrentForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  useEffect(() => {
    const fetchForms = async () => {
      const querySnapshot = await getDocs(collection(db, 'forms'));
      const formsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const filteredForms = formsData.filter(form => {
        if (!form.activeTime) return true;
        const [start, end] = form.activeTime.map(date => date && new Date(date));
        const now = new Date();
        if (!start && !end) return true;
        if (start && now < start) return false;
        if (end && now > end) return false;
        return true;
      });
      setForms(filteredForms);
    };
    fetchForms();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleOptionChange = (questionTextKey, option) => {
    setFormData({
      ...formData,
      [questionTextKey]: option
    });
  };

  const handleSliderChange = (questionTextKey, value) => {
    setFormData({
      ...formData,
      [questionTextKey]: value
    });
  };

  const handleSubmitResponse = async () => {
    if (currentForm) {
      await addDoc(collection(db, `forms/${currentForm.id}/responses`), formData);
      setFeedbackOpen(true);
      setTimeout(() => {
        setFeedbackOpen(false);
        setCurrentForm(null);
        setFormData({});
        window.location.href = '/';
      }, 2000);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: '800px', mx: 'auto' }}>
      {currentForm ? (
        <Box>
          <Typography variant="h4" sx={{ mb: 3 }}>{currentForm.title}</Typography>
          <Grid container spacing={2}>
            {currentForm.questions.map((question, index) => (
              <Grid item xs={12} key={index}>
                <FormRenderer
                  question={{ ...question, index }}
                  formData={formData}
                  handleFormChange={handleFormChange}
                  handleOptionChange={handleOptionChange}
                  handleSliderChange={handleSliderChange}
                />
              </Grid>
            ))}
          </Grid>
          <Button variant="contained" color="primary" onClick={handleSubmitResponse} sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography variant="h4" sx={{ mb: 3 }}>Available Forms</Typography>
          {forms.map((form) => (
            <Card key={form.id} sx={{ my: 2 }}>
              <CardContent>
                <Typography variant="h6">{form.title}</Typography>
                {form.activeTime && form.activeTime[1] && isValid(new Date(form.activeTime[1])) ? (
                  <Typography variant="body2" color="textSecondary">
                    Time till closing: {formatDistanceToNow(new Date(form.activeTime[1]), { addSuffix: true })}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    Active time not available
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" onClick={() => setCurrentForm(form)}>
                  Fill Out Form
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
      <Dialog open={feedbackOpen} onClose={() => setFeedbackOpen(false)}>
        <DialogTitle>Thank You!</DialogTitle>
        <DialogContent>
          <Typography>Your response has been recorded.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFeedbackOpen(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserForms;
