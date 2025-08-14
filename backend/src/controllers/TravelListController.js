const TravelList = require("../models/TravelListModel");

// CREATE
const createTravelList = async (req, res, next) => {
    try {
        const newTravelList = new TravelList({
            ...req.body,
            owner: req.user.id 
        });

        const savedTravelList = await newTravelList.save();
        res.status(201).json(savedTravelList);
    } catch (error) {
        next(error);
    }
};

// GET all (pagination + search)
const getTravelLists = async (req, res, next) => {
    try {
        const { search = "", sortBy = "createdAt", order = "asc", page = "1", limit = "10" } = req.query;

        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 10;
        const sortOrder = order === "desc" ? -1 : 1;

        const filter = {};
        if (search.trim()) {
            filter.title = { $regex: search.trim(), $options: "i" };
        }

        const total = await TravelList.countDocuments(filter);
        const travelLists = await TravelList.find(filter)
            .sort({ [sortBy]: sortOrder })
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);

        res.status(200).json({
            travelLists,
            total,
            page: pageNumber,
            pageSize: travelLists.length,
        });
    } catch (error) {
        next(error);
    }
};

const getTravelListById = async (req, res, next) => {
    try {
        const travelList = await TravelList.findById(req.params.id);
        if (!travelList) return res.status(404).json({ message: "Travel list not found" });

        res.status(200).json(travelList);
    } catch (error) {
        next(error);
    }
};

const deleteTravelList = async (req, res, next) => {
    try {
        const deleted = await TravelList.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Travel list not found" });

        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        next(error);
    }
};

const updateTravelList = async (req, res, next) => {
    try {
        const updated = await TravelList.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            overwrite: true,
        });

        if (!updated) return res.status(404).json({ message: "Travel list not found" });

        res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
};

const patchTravelList = async (req, res, next) => {
    try {
        const patched = await TravelList.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!patched) return res.status(404).json({ message: "Travel list not found" });

        res.status(200).json(patched);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTravelLists,
    getTravelListById,
    createTravelList,
    deleteTravelList,
    updateTravelList,
    patchTravelList,
};
