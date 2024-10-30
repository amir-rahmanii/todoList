import mongoose, { Document, Schema } from "mongoose";
import userModel from './user'

// Define an interface representing a Todo document in MongoDB
interface ITodo extends Document {
    title: string;
    completed: boolean;
    color: string;
    user: mongoose.Types.ObjectId; // Updated to ObjectId for consistency
}

// Define the schema with the ITodo interface as a generic type
const todoSchema = new Schema<ITodo>(
    {
        title: {
            type: String,
            required: [true, 'Title is required'], // Updated message for clarity
            minlength: 3,
            maxlength: 50,
            trim: true,
        },
        completed: {
            type: Boolean,
            required: [true, 'Completed status is required'],
            default: false,
        },
        color: {
            type: String,
            trim: true,
            default: "#FFFFFF", // Default color value
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            required: [true, 'User ID is required'], // Added validation message
        },
    },
    {
        timestamps: true,
    }
);

// Create and export the Todo model
const Todo = mongoose.models.Todo || mongoose.model<ITodo>("Todo", todoSchema); // Corrected model name

export default Todo;
