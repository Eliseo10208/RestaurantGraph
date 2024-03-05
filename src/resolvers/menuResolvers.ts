import businessLogic from '../businessLogic/menuBusinessLogic';
import webhooksModels from '../models/webhooksModel';
import { WebhookController } from '../webhook/webhook';

const resolvers = {
  Query: {
    menuItems: async (_: void, args: { page: number; pageSize: number }) => {
      return await businessLogic.getAllMenuItems(args.page, args.pageSize);
    },
    menuItem: async (_: void, args: { id: string }) => {
      const menuItem = await businessLogic.getMenuItemById(args.id);
      await WebhookController('menuItem', JSON.stringify(menuItem));
      return menuItem;
    },
    menuItemsByPriceRange: async (_: void, args: { minPrice: number; maxPrice: number }) => {
      const menuItems = await businessLogic.getMenuItemsByPriceRange(args.minPrice, args.maxPrice);
      await WebhookController('menuItemsByPriceRange', JSON.stringify(menuItems));
      return menuItems;
    },

    availableMenuItems: async (_: void, args: { page: number; pageSize: number }) => {
      return await businessLogic.getAvailableMenuItems(args.page, args.pageSize);
    },

    searchMenuItems: async (_: void, args: { searchTerm: string }) => {
      return await businessLogic.searchMenuItems(args.searchTerm);
    },
  },
  Mutation: {
    createMenuItem: async (_: void, args: { name: string; description: string; price: number }) => {
      const newItem = await businessLogic.addMenuItem(args.name, args.description, args.price);
      await WebhookController('createMenuItem', JSON.stringify(newItem));

      return newItem;
    },
    deleteMenuItem: async (_: void, args: { id: string }) => {
      return await businessLogic.removeMenuItemById(args.id);
    },
    updateMenuItem: async (_: void, args: { id: string; name: string; description: string; price: number }) => {
      return await businessLogic.updateMenuItem(args.id, args.name, args.description, args.price);
    },
    setMenuItemAvailability: async (_: void, args: { id: string; available: boolean }) => {
      return await businessLogic.setMenuItemAvailability(args.id, args.available);
    },
    receiveDiscordWebhookEvent: async (_parent: any, args: { url: any; events: any }) => {
      const { url, events } = args;
      const createdWebhook = new webhooksModels({url, event: events,});
      const res = await createdWebhook.save();
      console.log(res);
      return res;
    },
  },
};

export default resolvers;
