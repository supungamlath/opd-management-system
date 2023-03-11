const {signToken} = require('../../src/services/utils')
const {MySQLDBMySQLDB} = require('../../src/services/database')
const {root_config} = require('../../src/config/config') 

const db = new MySQLDBMySQLDB(root_config)

class User{
    constructor(req){
        this.role = req.body.role;
        this.username = req.body.username;
        this.email = req.body.email;
        this.password = req.body.password;
    }
}

// Async function to sign in a user
const signInUserAsync = async (req, res) => {
    try{
    // Select the user from the user table
    const [rows] = await db.connection.query('SELECT * FROM user WHERE username = ? AND password = ?', 
                                            [req.body.username,req.body.password]);
    const user = rows[0];
    console.log(user)

    if (!user) {
      return res.status(404).json({
      message: 'Invalid user ID or Password'
     });
   }
   const token = signToken(user)
   res.status(200).json({
    "token" : token,
    "role": "user"
   });
    
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};



module.exports = {
    User,
    signInUserAsync
  }