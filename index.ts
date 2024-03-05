import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import typeDefs from './src/graphql/graphqlSchema';
import {resolvers} from './src/resolvers/menuResolvers';
import jwt, { JwtPayload } from "jsonwebtoken";
import User from './src/models/userModel'

mongoose.connect('mongodb+srv://hex:12345@cluster0.ha8qnnw.mongodb.net/Graphcito', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any).then(() => {
  console.log('Conexión a la base de datos establecida!');
}).catch(err => {
  console.error('Error de conexión a la base de datos:', err);
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {

    const token = req.headers.authorization;

    if (token) {
      const operationType = req.body.operationName ? req.body.operationName : '';
      console.log(operationType);
      
      if (operationType === "LogIn") {
        const isRegisterMutation = req.body.query.includes("registerUser");
        const isLoginMutation = req.body.query.includes("logInUser");
        if (isRegisterMutation || isLoginMutation) {
          return {};
        }
      }
      try {
        const secret = 'secret';
        const decoded = jwt.verify(token, secret) as JwtPayload;
        const userId = decoded._id
        const res = await User.findById(userId)
        if(!res){
        return decoded;
        }else{
          throw Error("La credencial no es valida")
        }
      } catch (error) {
        console.log("No estás autenticado");
        throw Error("Las credenciales expiraron")
      }
    }else {
      if (req.body.query.includes("registerUser") || req.body.query.includes("logInUser")) {
        return {}
      }
      throw Error("No hay credenciales registradas")
    }
  },

});

server.listen(4001).then(({ url }) => {
  console.log('Server ready at', url);
});
