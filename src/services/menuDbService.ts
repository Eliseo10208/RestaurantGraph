import MenuItemModel from '../models/menuItemModel';
import userModel from '../models/userModel';
const dbService = {
  getAllMenuItemsPaginated: async (skip: number, limit: number) => {
    return await MenuItemModel.find()
      .skip(skip)
      .limit(limit);
  },
  getMenuItemById: async (id: string) => {
    return await MenuItemModel.findById(id);
  },
  createMenuItem: async (name: string, description: string, price: number) => {
    const newMenuItem = new MenuItemModel({ name, description, price });
    
    return await newMenuItem.save();
  },
  deleteMenuItemById: async (id: string) => {
    return await MenuItemModel.findByIdAndDelete(id);
  },
  getMenuItemsByPriceRange: async (minPrice: number, maxPrice: number) => {
    return await MenuItemModel.find({ price: { $gte: minPrice, $lte: maxPrice } });
  },

  getAvailableMenuItemsPaginated: async (skip: number, limit: number) => {
    return await MenuItemModel.find({ available: true })
      .skip(skip)
      .limit(limit);
  },

  searchMenuItems: async (searchTerm: string) => {
    const regex = new RegExp(searchTerm, 'i');
    return await MenuItemModel.find({ $or: [{ name: regex }, { description: regex }] });
  },

  updateMenuItem: async (id: string, name: string, description: string, price: number) => {
    return await MenuItemModel.findByIdAndUpdate(id, { name, description, price }, { new: true });
  },

  setMenuItemAvailability: async (id: string, available: boolean) => {
    return await MenuItemModel.findByIdAndUpdate(id, { available }, { new: true });
  },
  
};

export default dbService;