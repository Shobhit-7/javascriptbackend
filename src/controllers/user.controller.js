import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/Apierrors.js";
import{uploadOnCloudinary} from "../utils/cloudinary.js"
import { User } from "../models/user.models.js";
const registerUser = asyncHandler(async (req, res) => {
   // get user  details from frontend
   //validation - syntex wagera check hoga 
   //check if user already exits : username or email
   //check for images ,check for avatar
   // upload then to cloudinary,awatar:
   // create user object  - create entry in DB
   //  remove password and refresh token field from response 
   // check for user creations l
   // return response


   const{fullName,email,username,password}=req.body
   console.log("email",email);

   if(fullName ===""){
   
    [fullName,password,email,username].some((field)=> field?.trim()==="")
    {
        throw new ApiError(400,"fullname is required ")
    }
  
    const existedUser =User.findOne({
        $or :[{username},{email}]
    })
   if (existedUser){
    throw new ApiError(409,"user with email or username already exists")
   }
   const avatarLocalPath= req.files?.avatar[0]?.path;
   const coverImageLocalPath = req.files?.covewrImage[0]?.path;

   if (!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required")
   }

   const avatar = await uploadOnCloudinary(avatarLocalPath)
  const covewrImage = await uploadOnCloudinary(coverImageLocalPath)

  if(!avatar){
    throw new ApiError(400,"avatar file is required")
  }

  const user  = await User.  create({
    fullname,
    avatar :avatar.url,
    coverImage :covewrImage.url ||"",
    email,
    password,
    username : username.toLowerCase()
 })

  const creteuser = await User.findbyId(user._Id)





}
});

export { registerUser };