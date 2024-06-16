import express from 'express';
const router = express.Router();
import passport from 'passport';
import UserController from '../controllers/usuario.controller.js';
import authMiddleware from "../middleware/authmiddleware.js";

const userController = new UserController();

router.post('/register', passport.authenticate('register', { 
    successRedirect: '/api/users/profile',
    failureRedirect: '/register',
    failureFlash: true 
}));

router.post('/login', passport.authenticate('login', { 
    successRedirect: '/api/users/profile',
    failureRedirect: '/login',
    failureFlash: true 
}));

router.get('/profile', authMiddleware, userController.profile);
router.post('/logout', userController.logout);
router.get('/admin', authMiddleware, userController.admin);

export default router;