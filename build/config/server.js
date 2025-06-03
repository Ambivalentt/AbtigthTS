"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const connnectMongoDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
    }
};
exports.default = connnectMongoDB;
