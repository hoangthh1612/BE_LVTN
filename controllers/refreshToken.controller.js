const {User} = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({
        where: {
            refreshToken
        }
    })
    //foundUser.then((user) => console.log(user))
    // console.log(foundUser);
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // console.log("hehe");
    // console.log(foundUser);
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) {
                //console.log(foundUser.username);
                return res.sendStatus(403)
            };
            const accessToken = jwt.sign(
                { username: decoded.username, userId: decoded.userId },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken }