import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import typeDefs from './src/graphql/graphqlSchema';
import resolvers from './src/resolvers/menuResolvers';

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
});

server.listen(4001).then(({ url }) => {
  console.log('Server ready at', url);
});
