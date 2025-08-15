// Temporary User Data Storage
let users = [];

class AuthController {
    register (req, res) {
        const {username, password} = req.body;

        // User Validation
        if (!username || !password) return res.status(400).json({message: 'Username and Password are required'});

        if (users.find(user => user.username === username)) return res.status(400).json({mesage: 'Username already exists!'});

        users.push({username, password});

        res.status(201).json({
            message: `${username} registered successfully!`,
            user: {username}
        });  
    }

    
}

module.exports = AuthController;

