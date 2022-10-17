import mongoose, { model, Schema} from 'mongoose';


const bookSchema = new Schema({
    libraryId: String,
    // TITLE
    title: String,
    // DESCRIPTION
    description: String,
    // ISSUED AT
    issuedAt: String,
    // ISSUED BY 
    issuedBy: String,
    // ISSUED TO
    issuedTo: String,
    // ADDED TO LIBRARY BY
    addedBy: String,
    // ADDED AT
    addedAt: String,
    // RETURNED AT
    returnedAt: String,
    // RETURNED BY
    returnedBy: String,
});

const modelToReturn = mongoose.models.Book || model("Book", bookSchema);

export default modelToReturn;