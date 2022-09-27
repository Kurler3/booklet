import mongoose, {model, Schema} from 'mongoose';

const userSchema = new Schema({
    // USERNAME
    username: String,
    // PASSWORD
    password: String,
    // EMAIL
    email: String,
    // LIBRARIES ENROLLED
    librariesEnrolled: [String],
    // CREATED AT
    createdAt: String,
});

const modelToReturn = mongoose.models.User || model("User", userSchema);

export default modelToReturn;