import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import './App.css';

function App() {
  const [count, setCount] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/todos', newTodo);
      setCount([...count, response.data]);
      setNewTodo({ title: '', description: '' });
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      const updatedTodos = count.filter(todo => todo.id !== id);
      setCount(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/todos');
        setCount(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    const interval = setInterval(fetchTodos, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
    <center>
    <Typography variant='h1' fontWeight='700' sx={{textShadow:'5px 4px 0px white', color:'black'}} >
      Todo App
    </Typography>
    <Box>
      <Card sx={{ minWidth: 275 , maxWidth:500 , marginBottom:'12px', margin:'2rem',boxShadow:'0px 16px 0px 0px black' , borderRadius:'3rem'}}>
        <CardContent>
          <Typography variant='h5' sx={{color:'black' , fontWeight:'700'}} gutterBottom>
            Add New Todo
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <TextField
              type="text"
              fullWidth
              name="title"
              value={newTodo.title}
              onChange={handleInputChange}
              label="Title"
              variant="filled"
            />
            <br/>
            <TextField
              type="text"
              fullWidth
              name="description"
              value={newTodo.description}
              onChange={handleInputChange}
              label="Description"
              variant="filled"
            />
            <br/>
            <br/>
            <Button type="submit" variant="contained" sx={{backgroundColor:'yellowgreen', borderRadius:'100rem'}}>+</Button>
          </form>
          </CardContent>
      </Card>
    </Box>
   
    <Box>
    <Card sx={{ minWidth: 275 , maxWidth:500 , boxShadow:'0px 16px 0px 0px black' ,marginBottom:'12px', margin:'2rem', borderRadius:'3rem'}}>
        <CardContent>
          <Typography variant='h6' sx={{color:'black' , fontWeight:'700'}} gutterBottom>
            todos
          </Typography>
          <Card sx={{backgroundColor:'whitesmoke' , borderRadius:'3rem' , border:'dashed'}}>
          {count.map((todo) => (
            <div key={todo.id}>
              <Typography variant='h4' sx={{color:'black' , fontWeight:'500' , backgroundColor:'yellowgreen'}}>
              {todo.title}:
              </Typography>
              <Typography variant='p'>
              {todo.description}
              </Typography>
              <br/>
              <Button onClick={() => handleDelete(todo.id)} variant="contained" sx={{backgroundColor:'yellowgreen', borderRadius:'100rem',margin:'1rem'}}>-</Button>

            </div>
          ))}
          </Card>
          </CardContent>
      </Card>
    </Box>
    <Typography variant='h5' fontWeight='500' sx={{ color:'black'}} >
      @MashiBann
    </Typography>
    </center>
            </div>

  );
}

export default App;
