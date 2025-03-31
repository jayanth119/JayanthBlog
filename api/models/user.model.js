import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      sparse: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      sparse: true,
      unique: true,
    },
    password: {
      type: String,
      sparse: true,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    isAdmin: {
      type: Boolean,
      sparse: true,
      default: false,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
      default: () => {
        const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
        return randomNumber.toString();
      },
    },
      
     

  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;

