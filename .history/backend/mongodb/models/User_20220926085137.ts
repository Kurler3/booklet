import mongoose, {model, Schema} from 'mongoose';

const userSchema = new Schema({

});

const modelToReturn = mongoose.models.User || model("User", userSchema);

export default modelToReturn;