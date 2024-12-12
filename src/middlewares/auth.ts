import jwt from 'jsonwebtoken';

export const authenticate = (req: any, res: any, next: any) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};
