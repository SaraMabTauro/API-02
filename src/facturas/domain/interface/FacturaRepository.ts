import { Factura } from "../entities/Factura";
export interface FacturaRepository{
    createFactura(
        idFactura: string,
        pagoid:string
    ):Promise<Factura | null>
}   