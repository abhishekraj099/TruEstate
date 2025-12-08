import mongoose from 'mongoose';
import Sales from '../models/Sales.js';

mongoose.set('bufferCommands', false);
mongoose.set('bufferTimeoutMS', 0);

export const searchAndFilterSales = async (query) => {
  try {
    const { search, page = 1, limit = 10, sortBy, ...filters } = query;

    // Build MongoDB query
    const dbQuery = {};

    // Search functionality (works only if you later migrate to camelCase fields)
    if (search) {
      dbQuery.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
      ];
    }

    // Region filter
    if (filters.region) {
      const regions = Array.isArray(filters.region)
        ? filters.region
        : [filters.region];
      dbQuery['Customer Region'] = { $in: regions };
    }

    // Gender filter
    if (filters.gender) {
      const genders = Array.isArray(filters.gender)
        ? filters.gender
        : [filters.gender];
      dbQuery['Gender'] = { $in: genders };
    }

    // Category filter
    if (filters.category) {
      const categories = Array.isArray(filters.category)
        ? filters.category
        : [filters.category];
      dbQuery['Product Category'] = { $in: categories };
    }

    // Payment method filter
    if (filters.paymentMethod) {
      const methods = Array.isArray(filters.paymentMethod)
        ? filters.paymentMethod
        : [filters.paymentMethod];
      dbQuery['Payment Method'] = { $in: methods };
    }

    // Age range filter
    if (filters.minAge || filters.maxAge) {
      dbQuery['Age'] = {};
      if (filters.minAge) dbQuery['Age'].$gte = parseInt(filters.minAge);
      if (filters.maxAge) dbQuery['Age'].$lte = parseInt(filters.maxAge);
    }

    // Date range filter
    if (filters.startDate || filters.endDate) {
      dbQuery['Date'] = {};
      if (filters.startDate) dbQuery['Date'].$gte = new Date(filters.startDate);
      if (filters.endDate) dbQuery['Date'].$lte = new Date(filters.endDate);
    }

    // Build sort options (on CSV field names)
    let sortOptions = {};
    if (sortBy === 'date') {
      sortOptions = { Date: -1 };
    } else if (sortBy === 'quantity') {
      sortOptions = { Quantity: -1 };
    } else if (sortBy === 'name') {
      sortOptions = { 'Customer Name': 1 };
    } else {
      sortOptions = { Date: -1 }; // Default sort
    }

    // Execute query with pagination
    const totalItems = await Sales.countDocuments(dbQuery);
    const totalPages = Math.ceil(totalItems / limit);
    const skip = (page - 1) * limit;

    const data = await Sales.find(dbQuery)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Just pass through the fields that already exist in MongoDB
    const transformedData = data.map((item) => ({
      'Customer ID': item['Customer ID'],
      'Customer Name': item['Customer Name'],
      'Phone Number': item['Phone Number'],
      'Gender': item['Gender'],
      'Age': item['Age'],
      'Customer Region': item['Customer Region'],
      'Customer Type': item['Customer Type'],
      'Product ID': item['Product ID'],
      'Product Name': item['Product Name'],
      'Brand': item['Brand'],
      'Product Category': item['Product Category'],
      'Tags': item['Tags'],
      'Quantity': item['Quantity'],
      'Price per Unit': item['Price per Unit'],
      'Discount Percentage': item['Discount Percentage'],
      'Total Amount': item['Total Amount'],
      'Final Amount': item['Final Amount'],
      'Date': item['Date'],
      'Payment Method': item['Payment Method'],
      'Order Status': item['Order Status'],
      'Delivery Type': item['Delivery Type'],
      'Store ID': item['Store ID'],
      'Store Location': item['Store Location'],
      'Salesperson ID': item['Salesperson ID'],
      'Employee Name': item['Employee Name'],
    }));

    return {
      data: transformedData,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems,
        itemsPerPage: parseInt(limit),
      },
    };
  } catch (error) {
    throw new Error(`Search and filter error: ${error.message}`);
  }
};

export const getUniqueValues = async () => {
  try {
    const [regions, genders, categories, paymentMethods, tags] =
      await Promise.all([
        Sales.distinct('Customer Region'),
        Sales.distinct('Gender'),
        Sales.distinct('Product Category'),
        Sales.distinct('Payment Method'),
        Sales.distinct('Tags'),
      ]);

    const uniqueTags = [...new Set(
      tags.flatMap((tag) => (tag ? tag.split(',').map((t) => t.trim()) : [])),
    )].filter(Boolean);

    return {
      regions: regions.filter(Boolean).sort(),
      genders: genders.filter(Boolean).sort(),
      categories: categories.filter(Boolean).sort(),
      paymentMethods: paymentMethods.filter(Boolean).sort(),
      tags: uniqueTags.sort(),
    };
  } catch (error) {
    throw new Error(`Get unique values error: ${error.message}`);
  }
};

export const getSalesAnalytics = async () => {
  try {
    const analytics = await Sales.aggregate([
      {
        $group: {
          _id: '$Customer Region',
          totalRevenue: { $sum: '$Final Amount' },
          orderCount: { $sum: 1 },
          avgOrderValue: { $avg: '$Final Amount' },
        },
      },
      { $sort: { totalRevenue: -1 } },
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
          _id: '$Product Category',
          totalSales: { $sum: '$Final Amount' },
          totalQuantity: { $sum: '$Quantity' },
          avgPrice: { $avg: '$Price per Unit' },
        },
      },
      { $sort: { totalSales: -1 } },
    ]);

    return categoryStats;
  } catch (error) {
    throw new Error(`Category stats error: ${error.message}`);
  }
};
