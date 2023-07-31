const User = require('../schema/user.schema');
const jwt = require('jsonwebtoken');

async function createToken(email, password){
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Validate the password
    if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Create the JWT token
    return await jwt.sign({ email: user.email, isAdmin: user.isAdmin }, 'your-secret-key', { expiresIn: '1h' });

}
module.exports  = {
    createToken
}