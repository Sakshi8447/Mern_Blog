import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs'
import { ApiError } from "../utils/ApiError.js"
import { errorHandler } from '../utils/error.js';
//import jwt from 'jsonwebtoken';


const getAccessAndRefreshToken = async function (id) {
  // fetch the user
  try {
      const user = await User.findById(id);
      console.log(user);
      const accessToken = user.generateAccessToken()
      const refreshToken = user.generateRefreshToken()
      console.log(accessToken + "" + refreshToken)

      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
      console.log("hi")
      return { accessToken, refreshToken }
  } catch (error) {
      // res.status(500).json({message: "Something went wrong while generating referesh and access token"})
      // throw new ApiError(500, "Something went wrong while generating referesh and access token")
      console.log(error);
  }

}


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password ||username === '' || email === '' || password === '' ) {
        next(errorHandler(400, 'All field are required !'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User ({
        username,    
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.json('Signup successfully');

    } catch (error){
        next(error);
    }
    };


    //sign in

   export const signin = async (req, res) => {
      // fetch the req body and take out the email, password
      const { email, password } = req.body;
      console.log(email);
      console.log(password);
      // validate if all the fields are there or not
      if (!(email && password)) {
          return res.status(400).json({ message: "All fields are required" })
      }
  
      // make sure the email exists.
      const validUser = await User.findOne({ email });
      console.log(validUser);
      if(!validUser) {
          return res.status(400).json({ message: "Email does not exist" })
      }
      if(validUser === null) {
          return res.status(400).json({ message: "Email does not exist" })
      }
  
    
      const storedPassword = validUser.password
      const isValidPassword = await bcryptjs.compare(password, storedPassword);
  
      // const isValidPassword = await existedUser.isPasswordCorrect(password);
  
      if (!isValidPassword) {
          res.status(400).json({ message: "Invalid Password" })
      }
  
      // generate tokens and store in the cookies
      const { accessToken, refreshToken } = await getAccessAndRefreshToken(validUser._id);
  
      validUser.password = undefined; // to remove the password from the response
      // cookies can only be changed or updated by server 
      const options = {
          httpOnly: true,
          secure: true
      }
  
      return res.status(200)
          .cookie("accessToken", accessToken, options)
          .cookie("refreshToken", refreshToken, options)
          .json({ data: validUser, message: "USER LOGGED IN SUCCESSFULLY" })
  }
  
  

    // export const signin = async (req, res, next) => {
    //     const { email, password } = req.body;
      
    //     if (!email || !password || email === '' || password === '') {
    //       next(errorHandler(400, 'All fields are required'));
    //     }
      
    //     try {
    //       const validUser = await User.findOne({ email });
    //       if (!validUser) {
    //         return next(errorHandler(404, 'User not found'));
    //       }
    //       const validPassword = bcryptjs.compareSync(password, validUser.password);
    //       if (!validPassword) {
    //         return next(errorHandler(400, 'Invalid password'));
    //       }
    //       const token = jwt.sign(
    //         { id: validUser._id, isAdmin: validUser.isAdmin },
    //         process.env.ACCESS_TOKEN_SECRET
    //       );
      
    //       const { password: pass, ...rest } = validUser._doc;
      
    //       res
    //         .status(200)
    //         .cookie('access_token', token, {
    //           httpOnly: true,
    //         })
    //         .json(rest);
    //     } catch (error) {
    //       next(error);
    //     }
    //   };
      

    