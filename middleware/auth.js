const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log('--- Auth Check ---');
            console.log('Token Received:', token.substring(0, 10) + '...');


            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Token Verified. Decoded ID:', decoded.id);
            
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                console.log('User ID from token NOT found in DB.');
                return res.status(401).json({ message: 'User not found, token invalid' }); 
            }
            
            console.log(`User attached: ${req.user.email}`);
            next();
        } catch (error) {
            console.error('JWT Verification Failed:', error.message);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    else {
        console.log('No Authorization header found');
        
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
module.exports = authMiddleware;