import mongoose from "mongoose";
import fs from "fs";
import csv from "csv-parser";

// 1) Atlas connection string
const uri = "mongodb+srv://truestate_user:Abhisraj099@cluster0.wzmgnld.mongodb.net/truestate_db";

// 2) Mongoose schema (adjust field names to your CSV headers)
const salesSchema = new mongoose.Schema(
  { },
  { strict: false } // accept any columns
);

const Sale = mongoose.model("Sale", salesSchema);

async function run() {
  await mongoose.connect(uri);
  console.log("Connected to Atlas");

  const results = [];

  fs.createReadStream("./data/sales_data.csv")
    .pipe(csv())
    .on("data", (row) => {
      results.push(row);        // each row is an object from CSV
    })
    .on("end", async () => {
      console.log("CSV parsed, inserting", results.length, "rows...");
      await Sale.insertMany(results);
      console.log("Import done");
      await mongoose.disconnect();
      process.exit(0);
    })
    .on("error", async (err) => {
      console.error(err);
      await mongoose.disconnect();
      process.exit(1);
    });
}

run();
