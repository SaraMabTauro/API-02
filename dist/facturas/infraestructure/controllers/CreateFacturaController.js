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
exports.CreateFactureController = void 0;
class CreateFactureController {
    constructor(createFactureUseCase) {
        this.createFactureUseCase = createFactureUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const factura = yield this.createFactureUseCase.run(data.idFactura, data.pagoid);
                if (factura)
                    res.status(201).send({
                        status: "succes",
                        data: {
                            idFactura: factura.idFactura,
                            pagoid: factura.pagoid
                        }
                    });
            }
            catch (error) {
                res.status(204).send({
                    status: "error",
                    data: "Ocurrio un error",
                    mesagges: error
                });
            }
        });
    }
}
exports.CreateFactureController = CreateFactureController;
