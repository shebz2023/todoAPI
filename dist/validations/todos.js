"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoVal = void 0;
const joi_1 = __importDefault(require("joi"));
exports.todoVal = joi_1.default.object({
    title: joi_1.default.string().min(3),
    content: joi_1.default.string().min(5),
    completed: joi_1.default.string()
}).unknown(false);
