import { gql } from 'apollo-server';

const typeDefs = gql`
  type MenuItem {
    _id: ID
    name: String
    description: String
    price: Float
    available: Boolean
  }
  type User {
    id : ID
    name: String
    email: String
    password : String
}
  type DiscordWebhookEvent {
    id: ID!
    events : [String]
    url: String!
  }

  type Query {
    menuItemsAll: [MenuItem]
    menuItems(page: Int, pageSize: Int): [MenuItem]
    menuItem(id: ID): MenuItem
    menuItemsByPriceRange(minPrice: Float, maxPrice: Float): [MenuItem]
    searchMenuItems(searchTerm: String): [MenuItem]
    availableMenuItems(page: Int, pageSize: Int): [MenuItem]
    users : [User]
    user(id : ID) : User
  }

  type Mutation {
    createMenuItem(name: String, description: String, price: Float): MenuItem
    deleteMenuItem(id: ID): MenuItem
    updateMenuItem(id: ID!, name: String, description: String, price: Float): MenuItem
    setMenuItemAvailability(id: ID!, available: Boolean): MenuItem
    receiveDiscordWebhookEvent(url: String!, events: [String]): DiscordWebhookEvent!
    registerUser(name: String, email : String, password : String) : User
    logInUser(email : String, password : String) : String 
  }
  

`;

export default typeDefs;