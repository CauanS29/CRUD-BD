const express = require('express'); 
import { addUser, getUser, updateUser, deleteUser } from "../Users/user";

const router = express.Router(); 

router.get('/users/:id', getUser)
router.post('/users', addUser)
router.put('/users/update-user/:id',updateUser)
router.delete('/users/delete-user/:id', deleteUser)

export default router;