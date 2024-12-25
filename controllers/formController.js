const Form = require('../models/form');

// Create a new form
const createForm = async (req, res) => {
  const { title, questions,headerImage } = req.body;

  if (!title || !questions || questions.length === 0) {
    return res.status(400).json({ error: 'Title and questions are required.' });
  }

  try {
    const form = new Form({ title, questions,headerImage });
    await form.save();
    res.status(201).json(form);
  } catch (error) {
    console.error('Error saving form:', error);
    res.status(500).json({ error: 'An error occurred while saving the form.' });
  }
};

// Get all forms
const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    console.error('Error retrieving forms:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the forms.' });
  }
};

// Get a form by ID
const getFormById = async (req, res) => {
  const { formId } = req.params;

  try {
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.json(form);
  } catch (error) {
    console.error('Error retrieving form:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the form.' });
  }
};

const deleteById = async (req, res) => {
  const { formId } = req.params;

  try {
    const form = await Form.findByIdAndDelete(formId);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.json(form);
  } catch (error) {
    console.error('Error retrieving form:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the form.' });
  }
};



module.exports = {
  createForm,
  getAllForms,
  getFormById,
  deleteById,
};
