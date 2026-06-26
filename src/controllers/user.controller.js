
   // get user  details from frontend
   //validation - syntex wagera check hoga 
   //check if user already exits : username or email
   //check for images ,check for avatar
   // upload then to cloudinary,awatar:
   // create user object  - create entry in DB
   //  remove password and refresh token field from response 
   // check for user creations l
   // return response

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/Apierrors.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { User } from "../models/user.models.js";


const generateAccessAndRefreshTokens = async(userId) =>{
  try {
                
           const user = await User.findById(userId)
           const accessToken = user.generateAccessToken()
           const refreshToken = user.generateRefreshToken()
 
           User.refreshToken = refreshToken
           await user.save({ValidateBeforeSave : false})

           return{accessToken, refreshToken}



  } catch (error) {

    throw new ApiError(500,"something went wrong")
    
  }
}


















const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  console.log("email:", email);

  // Validation
  if (
    [fullName, email, username, password].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Existing user check
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  // File paths
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file required");
  }

  // Upload
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = coverImageLocalPath
    ? await uploadOnCloudinary(coverImageLocalPath)
    : null;

  if (!avatar) {
    throw new ApiError(400, "Avatar upload failed");
  }

  // Create user
  const user = await User.create({
    fullName,
    avatar: avatar.secure_url,
    coverImage: coverImage?.secure_url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "User creation failed");
  }

  return res.status(201).json(
    new ApiResponse(201, createdUser, "User registered successfully")
  );
});


const loginUser = asyncHandler(async(req , res) => {
   // req body -> data
//username or email
//find user
 // password check 
 // access and refresh token
 //send cookies
 // response

 const {email,username,password} = req.body


 if(!username || !email){
  throw new ApiError(400,"username or password is required")
 }

const user = await user.findOne({

  $or : [{username},{email}]
 })

 if(!user){
  throw new ApiError(400,"user does not registered")
 }


const isPasswordCorrect =await user.isPasswordCorrect(password)
if(!isPasswordCorrect){
  throw new ApiError(401,"password inccorrect")
}
 
 
 const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)
}
)







 
export { registerUser,
  loginUser

 };