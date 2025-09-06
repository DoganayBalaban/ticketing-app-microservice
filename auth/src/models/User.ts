import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Attributes (User oluştururken gereken alanlar)
interface UserAttrs {
  email: string;
  password: string;
}

// 2. Model interface (statics için)
interface UserModel extends Model<IUser> {
  build(attrs: UserAttrs): IUser;
}

// 3. Document interface
interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// ✅ statics ile type-safe constructor
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export { User };
