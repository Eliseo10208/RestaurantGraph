import businessLogic from '../businessLogic/menuBusinessLogic';
import webhooksModels from '../models/webhooksModel';
import { WebhookController } from '../webhook/webhook';
import jwt, { JwtPayload } from "jsonwebtoken";
import MenuItem from '../models/menuItemModel';
import User from '../models/userModel';
 export const resolvers = {
  Query: {
    menuItemsAll: async () =>{
      try {
        const res = await MenuItem.find()
        console.log(res)
        return res
      } catch (error) {
        console.log("ha ocurrido un error"+ error)
        
      }
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
    users: async () => {
      try {
        const res = await User.find();
        console.log(res);
        return res;
      } catch (error) {
        console.log(error);
      }
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
    registerUser: async (_: void, args: any) => {
      try {
        const user = new User({
          name: args.name,
          email: args.email,
          password: args.password,
        });
        const res = await user.save();
        console.log("datos mandado"+res);
        return res;
      } catch (error) {
        console.log(error);
      }
    },
    logInUser: async (_: void, args: any) => {
      try {
        const user = await User.findOne({ email: args.email }).select(
          "+password"
        );
        console.log(user);
        if (!user || user.password !== args.password)
          throw new Error("Credenciales invalidas");
        const token = generateToken(user);
        console.log(token);   
        return token;
      } catch (error) {
        console.log(error);
        return "Credendenciales invalidas";
      }
    },
    

  },
 
 
 }
 const generateToken = (user: any) => {
  return jwt.sign({ user }, "secret", { expiresIn: "1h" });
};
