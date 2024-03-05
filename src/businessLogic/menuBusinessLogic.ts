import dbService from '../services/menuDbService';

const businessLogic = {
  getAllMenuItems: async (page: number = 1, pageSize: number = 10) => {
    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    return await dbService.getAllMenuItemsPaginated(skip, limit);
  },
  getMenuItemById: async (id: string) => {
    return await dbService.getMenuItemById(id);
  },
  addMenuItem: async (name: string, description: string, price: number) => {
    const newItem = await dbService.createMenuItem(name, description, price);
    return newItem;
  },
  removeMenuItemById: async (id: string) => {
    return await dbService.deleteMenuItemById(id);
  },
  getMenuItemsByPriceRange: async (minPrice: number, maxPrice: number) => {
    return await dbService.getMenuItemsByPriceRange(minPrice, maxPrice);
  },
  
  getAvailableMenuItems: async (page: number = 1, pageSize: number = 10) => {
    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    return await dbService.getAvailableMenuItemsPaginated(skip, limit);
  },
  
  searchMenuItems: async (searchTerm: string) => {
    return await dbService.searchMenuItems(searchTerm);
  },

  updateMenuItem: async (id: string, name: string, description: string, price: number) => {
    return await dbService.updateMenuItem(id, name, description, price);
  },

  setMenuItemAvailability: async (id: string, available: boolean) => {
    return await dbService.setMenuItemAvailability(id, available);
  },
};

export default businessLogic;