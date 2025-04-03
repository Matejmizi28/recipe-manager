import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Box,
  Chip,
  IconButton,
  CardActions,
  Button,
} from '@mui/material';
import { Favorite, FavoriteBorder, Search, Add } from '@mui/icons-material';

// Temporary mock data - we'll replace this with real data later
const mockRecipes = [
  {
    id: 1,
    title: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper',
    image: 'https://source.unsplash.com/random/400x300/?pasta',
    category: 'Italian',
    calories: 650,
    isFavorite: false,
  },
  {
    id: 2,
    title: 'Chicken Stir Fry',
    description: 'Quick and healthy Asian-inspired dish with vegetables',
    image: 'https://source.unsplash.com/random/400x300/?chicken',
    category: 'Asian',
    calories: 450,
    isFavorite: true,
  },
  {
    id: 3,
    title: 'Vegetable Curry',
    description: 'Spicy Indian curry with mixed vegetables',
    image: 'https://source.unsplash.com/random/400x300/?curry',
    category: 'Indian',
    calories: 380,
    isFavorite: false,
  },
];

const RecipeList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState(mockRecipes);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleFavorite = (recipeId: number) => {
    setRecipes(recipes.map(recipe =>
      recipe.id === recipeId
        ? { ...recipe, isFavorite: !recipe.isFavorite }
        : recipe
    ));
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          My Recipes
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => navigate('/add-recipe')}
        >
          Add Recipe
        </Button>
      </Box>
      
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={handleSearch}
        InputProps={{
          startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
        }}
        sx={{ mb: 4 }}
      />

      <Grid container spacing={4}>
        {filteredRecipes.map((recipe) => (
          <Grid item key={recipe.id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 6,
                },
              }}
              onClick={() => navigate(`/recipes/${recipe.id}`)}
            >
              <CardMedia
                component="img"
                height="200"
                image={recipe.image}
                alt={recipe.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {recipe.title}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {recipe.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip label={recipe.category} color="primary" size="small" />
                  <Chip label={`${recipe.calories} calories`} color="secondary" size="small" />
                </Box>
              </CardContent>
              <CardActions>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(recipe.id);
                  }}
                  color="primary"
                >
                  {recipe.isFavorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RecipeList; 