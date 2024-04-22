import { query } from '../../../config/database';
import { Factura } from '../../domain/entities/Factura';
import { FacturaRepository } from '../../domain/interface/FacturaRepository';

export class MysqlFacturaRepository implements FacturaRepository {
    async createFactura(idFactura: string, idpago: string): Promise<Factura | null> {
        const sql = 'INSERT INTO facturas(idFactura, pagoid) VALUES (?, ?)';
        const params: any[] = [idFactura, idpago];
        try {
            const [result]: any = await query(sql, params);
            const factura: Factura = new Factura(idFactura, idpago);
            return factura;
        } catch (error) {
            console.error("Error creating factura:", error);
            return null;
        }
    }
}
