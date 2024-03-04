import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  available: {
    type: Boolean,
    default: true
  }
});

const MenuItem = mongoose.model('MenuItem', MenuItemSchema);

export default MenuItem;
