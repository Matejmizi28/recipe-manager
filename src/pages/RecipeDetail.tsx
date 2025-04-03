import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Delete,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';

// This would come from a database in a real app
const mockRecipes = [
  {
    id: 1,
    title: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper',
    image: 'https://source.unsplash.com/random/400x300/?pasta',
    category: 'Italian',
    calories: 650,
    isFavorite: false,
    ingredients: [
      '200g spaghetti',
      '100g pancetta or guanciale',
      '2 large eggs',
      '50g Pecorino Romano cheese',
      '50g Parmigiano Reggiano',
      'Black pepper',
      'Salt',
    ],
    instructions: [
      'Bring a large pot of salted water to boil and cook spaghetti according to package instructions.',
      'Meanwhile, cut the pancetta into small cubes.',
      'In a bowl, whisk together eggs, grated cheese, and black pepper.',
      'In a large pan, cook the pancetta until crispy.',
      'Drain the pasta, reserving some pasta water.',
      'Add the hot pasta to the pan with pancetta and remove from heat.',
      'Quickly stir in the egg mixture, adding pasta water if needed to create a creamy sauce.',
      'Serve immediately with extra cheese and black pepper.',
    ],
  },
  {
    id: 2,
    title: 'Chicken Stir Fry',
    description: 'Quick and healthy Asian-inspired dish with vegetables',
    image: 'https://source.unsplash.com/random/400x300/?chicken',
    category: 'Asian',
    calories: 450,
    isFavorite: true,
    ingredients: [
      '500g chicken breast, sliced',
      '2 cups mixed vegetables (broccoli, carrots, bell peppers)',
      '3 tbsp soy sauce',
      '2 tbsp oyster sauce',
      '1 tbsp sesame oil',
      '2 cloves garlic, minced',
      '1 thumb ginger, minced',
      '1 tbsp cornstarch mixed with 2 tbsp water',
    ],
    instructions: [
      'Slice chicken and vegetables into bite-sized pieces.',
      'Mix soy sauce, oyster sauce, and sesame oil in a small bowl.',
      'Heat oil in a wok or large pan over high heat.',
      'Add chicken and cook until golden brown, about 5-7 minutes.',
      'Add garlic and ginger, cook for 1 minute.',
      'Add vegetables and stir-fry for 3-5 minutes until tender-crisp.',
      'Pour in sauce mixture and bring to a boil.',
      'Add cornstarch slurry and cook until sauce thickens.',
      'Serve hot with rice or noodles.',
    ],
  },
];

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundRecipe = mockRecipes.find(r => r.id === Number(id));
    setRecipe(foundRecipe || null);
    setLoading(false);
  }, [id]);

  const handleToggleFavorite = () => {
    if (recipe) {
      setRecipe({ ...recipe, isFavorite: !recipe.isFavorite });
    }
  };

  const handleDelete = () => {
    // In a real app, this would delete from a database
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      navigate('/recipes');
    }
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!recipe) {
    return (
      <Container>
        <Typography>Recipe not found</Typography>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/recipes')}>
          Back to Recipes
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/recipes')}
        sx={{ mb: 2 }}
      >
        Back to Recipes
      </Button>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h4" component="h1">
            {recipe.title}
          </Typography>
          <Box>
            <IconButton onClick={handleToggleFavorite} color="primary">
              {recipe.isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <IconButton color="primary">
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={handleDelete}>
              <Delete />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <Chip label={recipe.category} color="primary" />
          <Chip label={`${recipe.calories} calories`} color="secondary" />
        </Box>

        <Box
          component="img"
          src={recipe.image}
          alt={recipe.title}
          sx={{
            width: '100%',
            maxHeight: 400,
            objectFit: 'cover',
            borderRadius: 1,
            mb: 3,
          }}
        />

        <Typography variant="body1" paragraph>
          {recipe.description}
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Ingredients
            </Typography>
            <List>
              {recipe.ingredients.map((ingredient: string, index: number) => (
                <ListItem key={index}>
                  <ListItemText primary={ingredient} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Instructions
            </Typography>
            <List>
              {recipe.instructions.map((instruction: string, index: number) => (
                <ListItem key={index}>
                  <ListItemText primary={`${index + 1}. ${instruction}`} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default RecipeDetail; 