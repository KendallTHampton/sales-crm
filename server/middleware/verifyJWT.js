import jwt from 'jsonwebtoken'

export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({error: 'No Token Provided'});
    console.log(authHeader);
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({error: 'Invalid Token'});
        req.user = user;
        next();
    })
}