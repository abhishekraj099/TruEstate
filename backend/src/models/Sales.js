import mongoose from 'mongoose';

const salesSchema = new mongoose.Schema({
  customerId: { type: String, required: true, index: true },
  customerName: { type: String, index: true },
  phoneNumber: String,
  gender: { type: String, index: true },
  age: { type: Number, index: true },
  customerRegion: { type: String, index: true },
  customerType: String,
  productId: String,
  productName: String,
  brand: String,
  productCategory: { type: String, index: true },
  tags: String,
  quantity: Number,
  pricePerUnit: Number,
  discountPercentage: Number,
  totalAmount: Number,
  finalAmount: Number,
  date: { type: Date, index: true },
  paymentMethod: { type: String, index: true },
  orderStatus: { type: String, index: true },
  deliveryType: String,
  storeId: String,
  storeLocation: String,
  salespersonId: String,
  employeeName: String
}, { 
  timestamps: true,
  collection: 'sales'
});

// Indexes for better query performance
salesSchema.index({ customerName: 'text', phoneNumber: 'text' });
salesSchema.index({ date: -1, customerRegion: 1 });

export default mongoose.model('Sales', salesSchema);
