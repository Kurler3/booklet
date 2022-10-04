import LibraryModel from '../../mongodb/models/Library';


const libraryResolver = {
    Query: {
        getEnrolledLibraries: async (_:null, args: {libraryIds: string|number[]}) => {
            const {libraryIds} = args;

            try {
                
                const enrolledLibraries = await LibraryModel.find({
                    "_id": {
                        $in: libraryIds
                    }
                });

                return enrolledLibraries;

            } catch (error) {
                return error;
            }
        }
    }
};

export default libraryResolver;