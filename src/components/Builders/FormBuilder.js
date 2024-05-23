import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { Box, Button, Typography } from '@mui/material';
import FormList from '../Lists/FormList';
import FormEditor from '../Editors/FormEditor';

const FormBuilder = () => {
  const [forms, setForms] = useState([]);
  const [currentForm, setCurrentForm] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchForms = async () => {
      const querySnapshot = await getDocs(collection(db, 'forms'));
      const formsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setForms(formsData);
    };
    fetchForms();
  }, []);

  const handleSaveForm = async (form) => {
    if (editMode) {
      await updateDoc(doc(db, 'forms', form.id), form);
    } else {
      const { id, ...formWithoutId } = form; // Exclude the id field when adding a new document
      const docRef = await addDoc(collection(db, 'forms'), formWithoutId);
      form.id = docRef.id; // Add the generated id to the form object
      setForms([...forms, form]);
    }
    setCurrentForm(null);
    setEditMode(false);
  };

  const handleEditForm = (form) => {
    setCurrentForm(form);
    setEditMode(true);
  };

  const handleDeleteForm = async (id) => {
    await deleteDoc(doc(db, 'forms', id));
    setForms(forms.filter((form) => form.id !== id));
  };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Box sx={{ flex: 1, p: 2 }}>
        <Typography variant="h6">Create/Edit Form</Typography>
        <FormEditor form={currentForm} onSave={handleSaveForm} />
      </Box>
      <Box sx={{ flex: 1, p: 2 }}>
        <Typography variant="h6">Forms</Typography>
        <FormList forms={forms} onEdit={handleEditForm} onDelete={handleDeleteForm} />
      </Box>
    </Box>
  );
};

export default FormBuilder;
