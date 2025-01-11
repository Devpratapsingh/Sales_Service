import asyncHandler from "../utils/asyncHandler.js";
import { itemsCollection } from "../db/index.js";
import apiResponse from "../utils/ApiResponse.js";

const getItems = asyncHandler(async function (req, res) {
    const { pageNo } = req.query;
    const result = await itemsCollection.find({ id: { $gt: (pageNo - 1) * 10 } }).limit(10).toArray();
    if (!result.length) return res.status(404).json(apiResponse(404, "No record/s found"));
    return res.status(200).json(apiResponse(200, "Sucesfully get records", result));
});

const getSearchItems = asyncHandler(async function (req, res) {
    const { pageNo, searchText } = req.query;
    let searchQuery = {
        $or: [
            { title: { $regex: searchText, $options: 'i' } },
            { description: { $regex: searchText, $options: 'i' } },
            { price: Number(searchText) }
        ]
    };
    const result = await itemsCollection.find(searchQuery).skip((pageNo - 1) * 10).limit(10).toArray();
    console.log(result);
    if (!result.length) return res.status(404).json(apiResponse(404, "No record/s found"));
    return res.status(200).json(apiResponse(200, "Sucesfully get records", result));
});

// The reason why looping is used for getting items according to date instead of aggregation pipeline is that the date format is of string not date and mongoose finding it not usual to convert this string to date and time format

 const getStatistics = asyncHandler(async function (req, res) {
    const { month } = req.query;
    const result = await itemsCollection.find({}).toArray();
    let totalSale = 0, soldCount = 0, unSoldCount = 0;
    for (let i of result) {
        let tempMonth = Number(i.dateOfSale.split("-")[1]);
        if (tempMonth == month) {
            if (i.sold) {
                totalSale += i.price;
                soldCount++;
            }
            else unSoldCount++;
        }
    }
    return res.status(200).json({totalSale, soldCount, unSoldCount});
});

export { getItems, getSearchItems, getStatistics };