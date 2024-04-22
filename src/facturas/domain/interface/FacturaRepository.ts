import { Factura } from "../entities/Factura";
export interface FacturaRepository{
    createFactura(
        idFactura: string,
        idpago:string
    ):Promise<Factura | null>
}   