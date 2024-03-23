import mongoose, { Document } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
}

const schema = mongoose.Schema;

const userSchema = new schema<UserDocument>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
