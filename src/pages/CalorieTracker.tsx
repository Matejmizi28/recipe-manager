import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  CircularProgress,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

interface MealEntry {
  id: number;
  name: string;
  calories: number;
  time: string;
}

const CalorieTracker = () => {
  const [dailyGoal, setDailyGoal] = useState('2000');
  const [meals, setMeals] = useState<MealEntry[]>([]);
  const [newMeal, setNewMeal] = useState({
    name: '',
    calories: '',
  });

  const handleAddMeal = (event: React.FormEvent) => {
    event.preventDefault();
    if (newMeal.name && newMeal.calories) {
      const meal: MealEntry = {
        id: Date.now(),
        name: newMeal.name,
        calories: Number(newMeal.calories),
        time: new Date().toLocaleTimeString(),
      };
      setMeals([...meals, meal]);
      setNewMeal({ name: '', calories: '' });
    }
  };

  const handleDeleteMeal = (id: number) => {
    setMeals(meals.filter(meal => meal.id !== id));
  };

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const remainingCalories = Number(dailyGoal) - totalCalories;
  const progress = (totalCalories / Number(dailyGoal)) * 100;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Calorie Tracker
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <TextField
            label="Daily Calorie Goal"
            type="number"
            value={dailyGoal}
            onChange={(e) => setDailyGoal(e.target.value)}
            sx={{ mr: 2 }}
          />
          <Box sx={{ position: 'relative', display: 'inline-flex', mr: 2 }}>
            <CircularProgress
              variant="determinate"
              value={Math.min(progress, 100)}
              size={60}
              color={progress > 100 ? 'error' : 'primary'}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="caption" component="div" color="text.secondary">
                {Math.round(progress)}%
              </Typography>
            </Box>
          </Box>
          <Typography variant="h6">
            {remainingCalories} calories remaining
          </Typography>
        </Box>

        <form onSubmit={handleAddMeal}>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              label="Meal Name"
              value={newMeal.name}
              onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
              required
            />
            <TextField
              label="Calories"
              type="number"
              value={newMeal.calories}
              onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Add Meal
            </Button>
          </Box>
        </form>

        <List>
          {meals.map((meal, index) => (
            <React.Fragment key={meal.id}>
              <ListItem>
                <ListItemText
                  primary={meal.name}
                  secondary={`${meal.calories} calories - ${meal.time}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteMeal(meal.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {index < meals.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default CalorieTracker; 