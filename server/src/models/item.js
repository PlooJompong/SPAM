import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export default mongoose.model('Item', ItemSchema);
// export default ItemSchema
