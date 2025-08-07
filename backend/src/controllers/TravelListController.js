const TravelList = require('../models/TravelLIstModel');
const mongoose = require('mongoose');

// Helper function
const parseIntOrDefault = (value, defaultValue) =>
    isNaN(parseInt(value)) ? defaultValue : parseInt(value);

// GET /travel-lists
const getTravelLists = async (req, res, next) => {
    try {
        const {
            search = '',
            sortBy = 'createdAt',
            order = 'asc',
            page = '1',
            limit = '10',
        } = req.query;

        const pageNumber = parseIntOrDefault(page, 1);
        const pageSize = parseIntOrDefault(limit, 10);
        const sortOrder = order === 'desc' ? -1 : 1;

        const filter = {};

        if (search.trim()) {
            filter.title = { $regex: search.trim(), $options: 'i' };
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
        if (!travelList) {
            res.status(404).json({ message: 'Travel list not found' });
            return;
        }

        res.status(200).json(travelList);
    } catch (error) {
        next(error);
    }
};

const createTravelList = async (req, res, next) => {
    try {
        const newTravelList = new TravelList(req.body);
        const savedTravelList = await newTravelList.save();
        res.status(201).json(savedTravelList);
    } catch (error) {
        next(error);
    }
};

const deleteTravelList = async (req, res, next) => {
    try {
        const deleted = await TravelList.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).json({ message: 'Travel list not found' });
            return;
        }

        res.status(200).json({ message: 'Deleted successfully' });
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

        if (!updated) {
            res.status(404).json({ message: 'Travel list not found' });
            return;
        }

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

        if (!patched) {
            res.status(404).json({ message: 'Travel list not found' });
            return;
        }

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
