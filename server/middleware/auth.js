const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'code2chill_chitkara_secret_key_2026';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authorization token required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session token' });
  }
};

const headOnlyMiddleware = (req, res, next) => {
  if (req.user && (req.user.role === 'head' || req.user.role === 'admin')) {
    next();
  } else {
    return res.status(403).json({ success: false, message: 'Access denied: Team head permissions required' });
  }
};

module.exports = { authMiddleware, headOnlyMiddleware, JWT_SECRET };
