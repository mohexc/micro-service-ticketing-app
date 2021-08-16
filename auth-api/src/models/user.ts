import mongoose from "mongoose";

interface UserAttrs {
    email: string
    password: string
}

interface UserModel extends mongoose.Model<any> {
    build(attrs: UserAttrs): any
}

interface UserDoc extends mongoose.Document {
    email: string
    password: string
}

const userSchema = new mongoose.Schema<UserDoc>({
    email: { type: String, require: true },
    password: { type: String, require: true },

})

userSchema.statics.build = (attrs: UserAttrs) => new User(attrs)

const User = mongoose.model<UserDoc | UserModel>('User', userSchema)

export { User }