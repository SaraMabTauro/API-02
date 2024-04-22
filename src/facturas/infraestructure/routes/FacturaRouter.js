"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facturaRouter = void 0;
const express_1 = __importDefault(require("express"));
const Dependecies_1 = require("../Dependecies");
exports.facturaRouter = express_1.default.Router();
exports.facturaRouter.post('/', Dependecies_1.createFacturaController.run.bind(Dependecies_1.createFacturaController));
