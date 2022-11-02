import mongoose, {model, Schema} from 'mongoose';

//  INIT SCHEMA
const issueRequestSchema = new Schema({
    // LIBRARY WHERE THIS WAS REQUESTED FROM
    libraryId: String,
    // BOOK FOR WHICH THE ISSUE WAS REQUESTED
    bookId: String,
    // THE ID OF THE USER THAT REQUESTED THIS BOOK
    requestingUserId: String,
    // THE DATE WHERE IT WAS CREATED
    createdAt: String,
});

// MODEL TO RETURN (IN CASE ALREADY EXISTING)
const modelToReturn = mongoose.models.IssueRequest || model("IssueRequest", issueRequestSchema);

// EXPORT
export default modelToReturn;