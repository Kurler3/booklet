// IMPORT APOLLO SERVER
import { ApolloServer} from "apollo-server-micro";

// PLAYGROUND PLUGINS
import {
    ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';

// CROSS ORIGIN 
import Cors from 'micro-cors';

// IMPORT TYPE DEFS
import typeDefs from '../../../backend/graphql/TypeDefs';

// IMPORT RESOLVERS
import resolvers from '../../../backend/graphql/resolvers/index';
import { NextApiRequest, NextApiResponse } from "next";
import { RequestHandler } from "micro";

// CONNECT DB FUNCTION
import connectDb from "../../../backend/mongodb/mongoose";

// BASE URL
import { BASE_URL } from "../../../utils/constants";

connectDb();


// INITIALIZE CORS
const cors = Cors({
    // origin: "*",
    // allowCredentials: true,
    // allowMethods: ["POST", "GET", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    // allowHeaders: ["access-control-allow-credentials","access-control-allow-origin","content-type"],
});

// INIT APOLLO SERVER
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // csrfPrevention: true,
    // MAKES IT SO THAT WE CAN GET THE REQUEST BODY IN THE CONTEXT IN THE RESOLVERS FUNCTION (ALLOWS TO CHECK FOR AUTH HEADERS)
    context: ({req}) => ({req}),
    introspection: true,
    
    // PLUGINS
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

// START SERVER PROMISE
const startServer = server.start();

// INIT HANDLER FUNCTION FOR THE SERVER TO CALL
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");

        // HANDLE PRE-FLIGHT
        if(req.method === "OPTIONS") {
            res.end();
            return false;
        }

        // WAIT FOR THE SERVER TO START
        await startServer;

        // WAIT FOR THE CREATE HANDLER
        return await server.createHandler({
            path: `/api/graphql`,
        })(req, res);
    } catch (error) {
        console.log('Big problem :/', error);
        res.status(500).json({message: "Something really really bad happened here"});
    }
}

// EXPORT THE HANDLER FUNCTION, BUT WITH CORS ALLOWED
export default cors(handler as RequestHandler); 


// EXPORT SERVER CONFIGURATION
export const config = {
    api: {
        bodyParser: false,
    }
};