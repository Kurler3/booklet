import mongoose, {model, Schema} from 'mongoose';

const libraryModel = new Schema({
    // NAME
    name: String,
    // ADMINS USER ID LIST
    admins: [String],
    // LIBRARIANS USER ID LIST
    librarians: [String],
    // BOOKS ID LIST
    books: [String],
    // CREATED AT
    createdAt: String,
});

const modelToReturn = mongoose.models.Library || model("Library", libraryModel);

export default modelToReturn;

