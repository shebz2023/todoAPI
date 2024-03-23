"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginVal = exports.signInVal = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signInVal = joi_1.default.object({
    username: joi_1.default.string().min(4).alphanum().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required().pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')),
    role: joi_1.default.string().valid('admin', 'user').optional(),
}).unknown(false);
exports.loginVal = joi_1.default.object({
    username: joi_1.default.string(),
    email: joi_1.default.string().email(),
    password: joi_1.default.string().required().pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')),
}).xor('username', 'email').required().unknown(false);
