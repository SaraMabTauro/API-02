"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlFacturaRepository = void 0;
const database_1 = require("../../../config/database");
const Factura_1 = require("../../domain/entities/Factura");
class MysqlFacturaRepository {
    createFactura(idFactura, idpago) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO facturas(idFactura, pagoid) VALUES (?, ?)';
            const params = [idFactura, idpago];
            try {
                const [result] = yield (0, database_1.query)(sql, params);
                const factura = new Factura_1.Factura(idFactura, idpago);
                return factura;
            }
            catch (error) {
                console.error("Error creating factura:", error);
                return null;
            }
        });
    }
}
exports.MysqlFacturaRepository = MysqlFacturaRepository;
