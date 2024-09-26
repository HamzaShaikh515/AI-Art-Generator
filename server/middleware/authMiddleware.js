import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log('Authorization Header:', authHeader);  // Log the header

  const token = authHeader?.split(' ')[1];  // Extract token
  console.log('Extracted Token:', token);  // Log the token

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token
    console.log('Decoded Token:', decoded);  // Log the decoded payload

    req.user = decoded;  // Attach user to request
    next();  // Proceed to next middleware
  } catch (error) {
    console.log('Token verification failed:', error.message);  // Log the error
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
