require('dotenv').config();
const jwt=require('jsonwebtoken');
function validateFields(req, res, next) {
    const { Name,Company,Password,} = req.body;

    if (!Name || !Company|| !Password) {
        return res.status(400).json({ error: 'Name, address, and password are required' });
    }
    next(); 
}
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer token

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('JWT verify error:', err);
            return res.status(403).json({ message: 'Token verification failed' });
        }
        req.user = user; // Attach the decoded user object to the request object
        next(); // Pass control to the next middleware or route handler
    });
};

module.exports={
    validateFields,
    authenticateToken,
};