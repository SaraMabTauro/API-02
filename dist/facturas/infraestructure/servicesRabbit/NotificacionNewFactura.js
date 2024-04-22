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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificacionNewFactura = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
class NotificacionNewFactura {
    constructor() {
        this.options = {
            protocol: 'amqp',
            username: 'guest',
            password: 'guest',
            port: 5672,
        };
        this.url = 'amqp://guest:guest@107.23.187.32';
        this.exch = 'up.Chiapas.pendiente';
        //Options solo para cloudamqp
        // this.server = process.env.AMQP_SERVER;
    }
    sendNotification(factura) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield amqplib_1.default.connect(this.url);
                const ch = yield conn.createChannel();
                const status = ch.publish(this.exch, "", Buffer.from(JSON.stringify(factura)));
                return status;
            }
            catch (error) {
                return false;
            }
        });
    }
}
exports.NotificacionNewFactura = NotificacionNewFactura;
