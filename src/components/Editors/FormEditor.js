import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, IconButton, FormControl, InputLabel, Select, MenuItem, Grid, Divider, FormGroup, Slider } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const FormEditor = ({ form, onSave }) => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [activeTime, setActiveTime] = useState({
    selection: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  });

  useEffect(() => {
    if (form) {
      setTitle(form.title);
      setQuestions(form.questions);
      if (form.activeTime) {
        setActiveTime({
          selection: {
            startDate: new Date(form.activeTime[0]),
            endDate: new Date(form.activeTime[1]),
            key: 'selection',
          },
        });
      }
    } else {
      setTitle('');
      setQuestions([]);
      setActiveTime({
        selection: {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        },
      });
    }
  }, [form]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = questions.map((question, i) =>
      i === index ? { ...question, [field]: value } : question
    );
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: '', type: 'text', options: [] }]);
  };

  const handleDeleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = questions.map((question, i) =>
      i === questionIndex ? { ...question, options: [...question.options, ''] } : question
    );
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = questions.map((question, i) =>
      i === questionIndex ? {
        ...question,
        options: question.options.map((opt, oi) => oi === optionIndex ? value : opt)
      } : question
    );
    setQuestions(updatedQuestions);
  };

  const handleSave = () => {
    onSave({ id: form?.id, title, questions, activeTime: [activeTime.selection.startDate, activeTime.selection.endDate] });
  };

  const questionTypes = [
    { value: 'text', label: 'Text' },
    { value: 'multipleChoice', label: 'Multiple Choice' },
    { value: 'trueFalse', label: 'True/False' },
    { value: 'selectableGrid', label: 'Selectable Grid' },
    { value: 'checkboxes', label: 'Checkboxes' },
    { value: 'dropdown', label: 'Dropdown' },
    { value: 'rating', label: 'Rating' },
    { value: 'slider', label: 'Slider' },
    { value: 'date', label: 'Date' },
    { value: 'time', label: 'Time' },
    { value: 'file', label: 'File' },
    { value: 'ranking', label: 'Ranking' },
    { value: 'nps', label: 'Net Promoter Score (NPS)' },
    { value: 'multipleTextboxes', label: 'Multiple Textboxes' },
    { value: 'imageChoice', label: 'Image Choice' }
  ];

  return (
    <Box sx={{ padding: 2, borderRadius: 1, boxShadow: 3, backgroundColor: '#fff' }}>
      <TextField
        label="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <Typography variant="h6">Active Time</Typography>
        <DateRangePicker
          ranges={[activeTime.selection]}
          onChange={(item) => setActiveTime({ ...activeTime, selection: item.selection })}
        />
      </FormControl>
      <Divider sx={{ my: 2 }} />
      {questions.map((question, index) => (
        <Box key={index} sx={{ mb: 3, p: 2, borderRadius: 1, boxShadow: 2, backgroundColor: '#f9f9f9' }}>
          <TextField
            label="Question Text"
            value={question.text}
            onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal" sx={{ mb: 4 }}>
            <InputLabel sx={{ marginBottom: '8px' }}>Type</InputLabel>
            <Select
              value={question.type}
              onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
              sx={{ marginTop: '16px' }}
            >
              {questionTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {(question.type === 'multipleChoice' || question.type === 'selectableGrid' || 
            question.type === 'checkboxes' || question.type === 'dropdown' || 
            question.type === 'ranking' || question.type === 'nps' || 
            question.type === 'multipleTextboxes' || question.type === 'imageChoice') && (
            <FormGroup>
              {question.options.map((option, optIndex) => (
                <TextField
                  key={optIndex}
                  label={`Option ${optIndex + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                  fullWidth
                  margin="normal"
                />
              ))}
              <Button variant="contained" onClick={() => handleAddOption(index)}>
                Add Option
              </Button>
            </FormGroup>
          )}
          {question.type === 'trueFalse' && (
            <FormControl fullWidth margin="normal">
              <InputLabel>True/False</InputLabel>
              <Select
                value={question.options[0] || ''}
                onChange={(e) => handleQuestionChange(index, 'options', [e.target.value])}
              >
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
            </FormControl>
          )}
          {question.type === 'slider' && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Slider</InputLabel>
              <Slider
                value={question.options[0] || 0}
                onChange={(e, value) => handleQuestionChange(index, 'options', [value])}
                step={1}
                marks
                min={0}
                max={100}
                valueLabelDisplay="auto"
              />
            </FormControl>
          )}
          <IconButton onClick={() => handleDeleteQuestion(index)} sx={{ mt: 2 }}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button variant="contained" onClick={handleAddQuestion} startIcon={<AddIcon />} sx={{ mt: 2 }}>
        Add Question
      </Button>
      <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2, ml: 2 }}>
        Save Form
      </Button>
    </Box>
  );
};

export default FormEditor;
