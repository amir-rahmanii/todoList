import mongoose, { Document, Schema } from "mongoose";

// Define an interface representing a User document in MongoDB
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

// Define the schema with the IUser interface as a generic type
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      index: true,
      minlength: 3,
      maxlength: 20,
      trim: true,
      validate: {
        validator: (v: string) => !!v && v.length > 0, // Ensure returns boolean only
        message: 'Username cannot be empty',
      },
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      index: true,
      minlength: 5,
      maxlength: 50,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
        message: (props: { value: string }) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
      minlength: 8,
      maxlength: 128,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the User model
const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
