const {signToken} = require('../../src/services/utils')
const {MySQLDBMySQLDB} = require('../../src/services/database')
const {root_config} = require('../../src/config/config') 

const db = new MySQLDBMySQLDB(root_config)

class User{
    constructor(data){
        this.role = data.role;
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
    }
}

// Async function to sign in a user
const signInUserAsync = async (req, res) => {
    try{
    // Select the user from the user table
    const [rows] = await db.connection.query('SELECT * FROM user WHERE username = ? AND password = ?', 
                                            [req.body.username,req.body.password]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({
      message: 'Invalid user ID or Password'
     });
   }
   const token = signToken(user)
   res.status(200).json({
    "token" : token,
    "role": user.role
   });
    
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const signUpUserAsync = async (req, res) => {
  try{
    // Set the role of the user as patient because only patients
    const user = new User(req.body)
    
    // Insert the user into the User table
    const [result] = await db.connection.query('INSERT INTO user SET ?', user);
    const insertedUserId = result.insertId;
    const token = signToken({user})

    res.status(200).json({
      "token" : token,
      "role": user.role
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}


module.exports = {
    User,
    signInUserAsync,
    signUpUserAsync
  }