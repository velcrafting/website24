import React, { useEffect, useState } from 'react';
import { TextField, RadioGroup, FormControlLabel, Radio, Checkbox, FormControl, FormLabel, FormGroup, Slider, Select, MenuItem, Box, Typography } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const FormRenderer = ({ question, formData, handleFormChange, handleOptionChange, handleSliderChange }) => {
  const questionTextKey = question.text.replace(/\s+/g, '_').toLowerCase(); // Creating a key-friendly version of the question text

  useEffect(() => {
    if (question.type === 'ranking' && !formData[questionTextKey]) {
      handleFormChange({
        target: {
          name: questionTextKey,
          value: question.options
        }
      });
    }
  }, [question, formData, handleFormChange, questionTextKey]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(formData[questionTextKey]);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    handleFormChange({
      target: {
        name: questionTextKey,
        value: items
      }
    });
  };

  const renderQuestion = () => {
    switch (question.type) {
      case 'text':
        return (
          <TextField
            fullWidth
            name={questionTextKey}
            onChange={handleFormChange}
            value={formData[questionTextKey] || ''}
            sx={{ mb: 2 }}
          />
        );
      case 'multipleChoice':
        return (
          <RadioGroup name={questionTextKey} onChange={(e) => handleOptionChange(questionTextKey, e.target.value)} sx={{ mb: 2 }}>
            {question.options.map((option, i) => (
              <FormControlLabel key={i} value={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
        );
      case 'trueFalse':
        return (
          <RadioGroup name={questionTextKey} onChange={(e) => handleOptionChange(questionTextKey, e.target.value)} sx={{ mb: 2 }}>
            <FormControlLabel value="true" control={<Radio />} label="True" />
            <FormControlLabel value="false" control={<Radio />} label="False" />
          </RadioGroup>
        );
      case 'selectableGrid':
        return (
          <FormGroup sx={{ mb: 2 }}>
            {question.options.map((option, i) => (
              <FormControlLabel
                key={i}
                control={
                  <Checkbox
                    checked={formData[questionTextKey]?.includes(option) || false}
                    onChange={(e) => {
                      const selectedOptions = formData[questionTextKey] || [];
                      if (e.target.checked) {
                        handleFormChange({
                          target: {
                            name: questionTextKey,
                            value: [...selectedOptions, option]
                          }
                        });
                      } else {
                        handleFormChange({
                          target: {
                            name: questionTextKey,
                            value: selectedOptions.filter(opt => opt !== option)
                          }
                        });
                      }
                    }}
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>
        );
      case 'checkboxes':
        return (
          <FormGroup sx={{ mb: 2 }}>
            {question.options.map((option, i) => (
              <FormControlLabel
                key={i}
                control={
                  <Checkbox
                    checked={formData[questionTextKey]?.includes(option) || false}
                    onChange={(e) => {
                      const selectedOptions = formData[questionTextKey] || [];
                      if (e.target.checked) {
                        handleFormChange({
                          target: {
                            name: questionTextKey,
                            value: [...selectedOptions, option]
                          }
                        });
                      } else {
                        handleFormChange({
                          target: {
                            name: questionTextKey,
                            value: selectedOptions.filter(opt => opt !== option)
                          }
                        });
                      }
                    }}
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>
        );
      case 'dropdown':
        return (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Select
              name={questionTextKey}
              value={formData[questionTextKey] || ''}
              onChange={(e) => handleOptionChange(questionTextKey, e.target.value)}
            >
              {question.options.map((option, i) => (
                <MenuItem key={i} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'rating':
        return (
          <RadioGroup name={questionTextKey} onChange={(e) => handleOptionChange(questionTextKey, e.target.value)} sx={{ mb: 2 }}>
            {[1, 2, 3, 4, 5].map((option, i) => (
              <FormControlLabel key={i} value={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
        );
      case 'slider':
        return (
          <Box sx={{ mb: 2 }}>
            <Slider
              name={questionTextKey}
              value={formData[questionTextKey] || 0}
              onChange={(e, value) => handleSliderChange(questionTextKey, value)}
              step={1}
              marks
              min={0}
              max={100}
              valueLabelDisplay="auto"
            />
          </Box>
        );
      case 'date':
        return (
          <TextField
            name={questionTextKey}
            type="date"
            fullWidth
            onChange={handleFormChange}
            value={formData[questionTextKey] || ''}
            sx={{ mb: 2 }}
          />
        );
      case 'time':
        return (
          <TextField
            name={questionTextKey}
            type="time"
            fullWidth
            onChange={handleFormChange}
            value={formData[questionTextKey] || ''}
            sx={{ mb: 2 }}
          />
        );
      case 'file':
        return (
          <TextField
            name={questionTextKey}
            type="file"
            fullWidth
            onChange={handleFormChange}
            sx={{ mb: 2 }}
          />
        );
      case 'ranking':
        return (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="ranking">
              {(provided) => (
                <Box ref={provided.innerRef} {...provided.droppableProps} sx={{ mb: 2 }}>
                  {formData[questionTextKey]?.map((option, index) => (
                    <Draggable key={option} draggableId={option} index={index}>
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{ mb: 1, p: 2, border: '1px solid #ccc', borderRadius: 1, backgroundColor: '#f9f9f9' }}
                        >
                          {option}
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        );
      case 'nps':
        return (
          <RadioGroup name={questionTextKey} onChange={(e) => handleOptionChange(questionTextKey, e.target.value)} sx={{ mb: 2 }}>
            {[...Array(11).keys()].map((option, i) => (
              <FormControlLabel key={i} value={option} control={<Radio />} label={option.toString()} />
            ))}
          </RadioGroup>
        );
      case 'multipleTextboxes':
        return (
          <FormGroup sx={{ mb: 2 }}>
            {question.options.map((option, i) => (
              <TextField
                key={i}
                label={option}
                name={`${questionTextKey}_textbox_${i}`}
                onChange={handleFormChange}
                value={formData[`${questionTextKey}_textbox_${i}`] || ''}
                fullWidth
                sx={{ my: 1 }}
              />
            ))}
          </FormGroup>
        );
      case 'imageChoice':
        return (
          <FormGroup sx={{ mb: 2 }}>
            {question.options.map((option, i) => (
              <FormControlLabel
                key={i}
                control={
                  <Checkbox
                    checked={formData[questionTextKey]?.includes(option) || false}
                    onChange={(e) => {
                      const selectedOptions = formData[questionTextKey] || [];
                      if (e.target.checked) {
                        handleFormChange({
                          target: {
                            name: questionTextKey,
                            value: [...selectedOptions, option]
                          }
                        });
                      } else {
                        handleFormChange({
                          target: {
                            name: questionTextKey,
                            value: selectedOptions.filter(opt => opt !== option)
                          }
                        });
                      }
                    }}
                  />
                }
                label={<img src={option} alt={`option-${i}`} style={{ width: '100px', height: '100px' }} />}
              />
            ))}
          </FormGroup>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ my: 2 }}>
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend" sx={{ mb: 2 }}>{question.text}</FormLabel>
        {renderQuestion()}
      </FormControl>
    </Box>
  );
};

export default FormRenderer;
