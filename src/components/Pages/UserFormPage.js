import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { Box, Button, Typography, TextField, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, CircularProgress } from '@mui/material';

const UserForms = () => {
  const [forms, setForms] = useState([]);
  const [currentForm, setCurrentForm] = useState(null);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      const querySnapshot = await getDocs(collection(db, 'forms'));
      const formsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setForms(formsData);
      setLoading(false);
    };
    fetchForms();
  }, []);

  const handleResponseChange = (questionIndex, value) => {
    setResponses({ ...responses, [questionIndex]: value });
  };

  const handleSubmit = async () => {
    if (currentForm) {
      const formResponses = {
        formId: currentForm.id,
        responses,
        timestamp: new Date(),
      };
      await addDoc(collection(db, 'forms', currentForm.id, 'responses'), formResponses);
      setCurrentForm(null);
      setResponses({});
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {currentForm ? (
        <Box>
          <Typography variant="h6">{currentForm.title}</Typography>
          {currentForm.questions.map((question, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">{question.text}</Typography>
              {question.type === 'text' ? (
                <TextField
                  fullWidth
                  margin="normal"
                  value={responses[index] || ''}
                  onChange={(e) => handleResponseChange(index, e.target.value)}
                />
              ) : (
                <FormControl component="fieldset">
                  <FormLabel component="legend">Options</FormLabel>
                  <RadioGroup
                    value={responses[index] || ''}
                    onChange={(e) => handleResponseChange(index, e.target.value)}
                  >
                    {question.options.map((option, optIndex) => (
                      <FormControlLabel
                        key={optIndex}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            </Box>
          ))}
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography variant="h6">Available Forms</Typography>
          {forms.map((form) => (
            <Box key={form.id} sx={{ mb: 2 }}>
              <Button variant="outlined" onClick={() => setCurrentForm(form)}>
                {form.title}
              </Button>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default UserForms;
