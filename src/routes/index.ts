const express = require('express'); 
import { addUser, getUser, updateUser, deleteUser } from "../Users/user";
import { addTeam, getTeam, updateTeam, deleteTeam } from "../Team/team";
import { addFavorite, getFavorites, updateFavorite, deleteFavorite } from "../Favorites/favorites"
import { addSport } from "../Sport/sport";

const router = express.Router(); 

// User Routes
router.get('/users/:id', getUser)
router.post('/add-users', addUser)
router.put('/users/update-user/:id',updateUser)
router.delete('/users/delete-user/:id', deleteUser)

// Team Routes
router.post('/team/add-team', addTeam)
router.get('/team/:id', getTeam)
router.put('/team/update-team/:id', updateTeam)
router.delete('/team/delete-team/:id', deleteTeam)

// Favorite Routes
router.post('/favorite/add-favorite', addFavorite)
router.get('/favorite/:id', getFavorites)
router.put('/favorite/update-favorite/:id', updateFavorite)
router.delete('/favorite/delete-favorite/:id', deleteFavorite)

// Sport Routes
router.post('/sport/add-sport', addSport)

export default router;