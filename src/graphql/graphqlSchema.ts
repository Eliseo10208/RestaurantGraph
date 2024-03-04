import { gql } from 'apollo-server';

const typeDefs = gql`
  type MenuItem {
    _id: ID
    name: String
    description: String
    price: Float
    available: Boolean
  }

  type DiscordWebhookEvent {
    id: ID!
    events : [String]
    url: String!
  }

  type Query {
    menuItems(page: Int, pageSize: Int): [MenuItem]
    menuItem(id: ID): MenuItem
    menuItemsByPriceRange(minPrice: Float, maxPrice: Float): [MenuItem]
    searchMenuItems(searchTerm: String): [MenuItem]
    availableMenuItems(page: Int, pageSize: Int): [MenuItem]
  }

  type Mutation {
    createMenuItem(name: String, description: String, price: Float): MenuItem
    deleteMenuItem(id: ID): MenuItem
    updateMenuItem(id: ID!, name: String, description: String, price: Float): MenuItem
    setMenuItemAvailability(id: ID!, available: Boolean): MenuItem
    receiveDiscordWebhookEvent(url: String!, events: [String]): DiscordWebhookEvent!
  }
`;

export default typeDefs;