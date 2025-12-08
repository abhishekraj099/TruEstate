import mongoose from 'mongoose';
import Sales from '../models/Sales.js';

mongoose.set('bufferCommands', false);
mongoose.set('bufferTimeoutMS', 0);

export const searchAndFilterSales = async (query) => {
  try {
    const { search, page = 1, limit = 10, sortBy, ...filters } = query;

    // Build MongoDB query
    const dbQuery = {};

    // Search functionality
    if (search) {
      dbQuery.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } }
      ];
    }

    // Region filter
    if (filters.region) {
      const regions = Array.isArray(filters.region) ? filters.region : [filters.region];
      dbQuery.customerRegion = { $in: regions };
    }

    // Gender filter
    if (filters.gender) {
      const genders = Array.isArray(filters.gender) ? filters.gender : [filters.gender];
      dbQuery.gender = { $in: genders };
    }

    // Category filter
    if (filters.category) {
      const categories = Array.isArray(filters.category) ? filters.category : [filters.category];
      dbQuery.productCategory = { $in: categories };
    }

    // Payment method filter
    if (filters.paymentMethod) {
      const methods = Array.isArray(filters.paymentMethod) ? filters.paymentMethod : [filters.paymentMethod];
      dbQuery.paymentMethod = { $in: methods };
    }

    // Age range filter
    if (filters.minAge || filters.maxAge) {
      dbQuery.age = {};
      if (filters.minAge) dbQuery.age.$gte = parseInt(filters.minAge);
      if (filters.maxAge) dbQuery.age.$lte = parseInt(filters.maxAge);
    }

    // Date range filter
    if (filters.startDate || filters.endDate) {
      dbQuery.date = {};
      if (filters.startDate) dbQuery.date.$gte = new Date(filters.startDate);
      if (filters.endDate) dbQuery.date.$lte = new Date(filters.endDate);
    }

    // Build sort options
    let sortOptions = {};
    if (sortBy === 'date') {
      sortOptions = { date: -1 };
    } else if (sortBy === 'quantity') {
      sortOptions = { quantity: -1 };
    } else if (sortBy === 'name') {
      sortOptions = { customerName: 1 };
    } else {
      sortOptions = { date: -1 }; // Default sort
    }

    // Execute query with pagination
    const totalItems = await Sales.countDocuments(dbQuery);
    const totalPages = Math.ceil(totalItems / limit);
    const skip = (page - 1) * limit;

    const data = await Sales.find(dbQuery)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .lean(); // Convert to plain JavaScript objects

    // Transform data to match your frontend format
    const transformedData = data.map(item => ({
      'Customer ID': item.customerId,
      'Customer Name': item.customerName,
      'Phone Number': item.phoneNumber,
      'Gender': item.gender,
      'Age': item.age,
      'Customer Region': item.customerRegion,
      'Customer Type': item.customerType,
      'Product ID': item.productId,
      'Product Name': item.productName,
      'Brand': item.brand,
      'Product Category': item.productCategory,
      'Tags': item.tags,
      'Quantity': item.quantity,
      'Price per Unit': item.pricePerUnit,
      'Discount Percentage': item.discountPercentage,
      'Total Amount': item.totalAmount,
      'Final Amount': item.finalAmount,
      'Date': item.date,
      'Payment Method': item.paymentMethod,
      'Order Status': item.orderStatus,
      'Delivery Type': item.deliveryType,
      'Store ID': item.storeId,
      'Store Location': item.storeLocation,
      'Salesperson ID': item.salespersonId,
      'Employee Name': item.employeeName
    }));

    return {
      data: transformedData,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems,
        itemsPerPage: parseInt(limit)
      }
    };
  } catch (error) {
    throw new Error(`Search and filter error: ${error.message}`);
  }
};

export const getUniqueValues = async () => {
  try {
    // Get distinct values from database
    const [regions, genders, categories, paymentMethods, tags] = await Promise.all([
      Sales.distinct('customerRegion'),
      Sales.distinct('gender'),
      Sales.distinct('productCategory'),
      Sales.distinct('paymentMethod'),
      Sales.distinct('tags')
    ]);

    // Process tags if they contain comma-separated values
    const uniqueTags = [...new Set(
      tags.flatMap(tag => (tag ? tag.split(',').map(t => t.trim()) : []))
    )].filter(Boolean);

    return {
      regions: regions.filter(Boolean).sort(),
      genders: genders.filter(Boolean).sort(),
      categories: categories.filter(Boolean).sort(),
      paymentMethods: paymentMethods.filter(Boolean).sort(),
      tags: uniqueTags.sort()
    };
  } catch (error) {
    throw new Error(`Get unique values error: ${error.message}`);
  }
};

// Additional analytics functions
export const getSalesAnalytics = async () => {
  try {
    const analytics = await Sales.aggregate([
      {
        $group: {
          _id: '$customerRegion',
          totalRevenue: { $sum: '$finalAmount' },
          orderCount: { $sum: 1 },
          avgOrderValue: { $avg: '$finalAmount' }
        }
      },
      { $sort: { totalRevenue: -1 } }
    ]);

    return analytics;
  } catch (error) {
    throw new Error(`Analytics error: ${error.message}`);
  }
};

export const getCategoryStats = async () => {
  try {
    const categoryStats = await Sales.aggregate([
      {
        $group: {
          _id: '$productCategory',
          totalSales: { $sum: '$finalAmount' },
          totalQuantity: { $sum: '$quantity' },
          avgPrice: { $avg: '$pricePerUnit' }
        }
      },
      { $sort: { totalSales: -1 } }
    ]);

    return categoryStats;
  } catch (error) {
    throw new Error(`Category stats error: ${error.message}`);
  }
};
