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
exports.CreateFacturaUseCase = void 0;
class CreateFacturaUseCase {
    constructor(FacturaRepository, notification, socket) {
        this.FacturaRepository = FacturaRepository;
        this.notification = notification;
        this.socket = socket;
    }
    run(idFactura, pagoid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const factura = yield this.FacturaRepository.createFactura(idFactura, pagoid);
                if (factura)
                    this.notification.run(factura);
                this.socket.emit("suscribcion payment", factura);
                return factura;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.CreateFacturaUseCase = CreateFacturaUseCase;
