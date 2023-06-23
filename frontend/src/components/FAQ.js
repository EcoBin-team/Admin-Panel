import React, { useEffect, useState } from 'react';
import { Typography, Box, Paper, Collapse, Button, TextField } from '@mui/material';

import axios from 'axios';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/helps/faqs');
      setFaqs(response.data);
      setExpanded({});
    } catch (error) {
      console.error(error);
    }
  };

  const toggleAnswer = (faqId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [faqId]: !prevExpanded[faqId],
    }));
  };

  const addFAQ = async () => {
    try {
      const response = await axios.post('http://localhost:5000/helps/faq/post', {
        question: newQuestion,
        answer: newAnswer,
      });
      setFaqs((prevFaqs) => [...prevFaqs, response.data]);
      setNewQuestion('');
      setNewAnswer('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          marginBottom: 2,
          textAlign: 'center',
          color: '#8ff180',
        }}
      >
        Frequently Asked Questions
      </Typography>

      {faqs.map((faq) => (
        <Paper
          key={faq.id}
          elevation={2}
          sx={{
            backgroundColor: '#ffffff',
            marginBottom: 2,
            padding: 2,
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 'bold',
                color: '#000',
                marginBottom: 1,
                cursor: 'pointer',
              }}
              onClick={() => toggleAnswer(faq.id)}
            >
              {faq.question}
            </Typography>
            <Collapse in={expanded[faq.id]} timeout="auto" unmountOnExit>
              <Typography variant="body2" sx={{ color: '#000' }}>
                {faq.answer}
              </Typography>
            </Collapse>
          </Box>
        </Paper>
      ))}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 2,
        }}
      >
        <Box sx={{ marginRight: 1 }}>
          <TextField
            label="Question"
            variant="outlined"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
        </Box>
        <Box sx={{ marginRight: 1 }}>
          <TextField
            label="Answer"
            variant="outlined"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
        </Box>
        <Button variant="contained" onClick={addFAQ}>
          Add FAQ
        </Button>
      </Box>
    </Box>
  );
};

export default FAQ;
