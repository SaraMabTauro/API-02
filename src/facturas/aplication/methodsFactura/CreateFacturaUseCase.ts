import { Factura } from '../../domain/entities/Factura';
import { FacturaRepository } from '../../domain/interface/FacturaRepository';
import { NotificacionFacturaUseCase } from '../services/NotificacionNewFactura';
import { ISocketIOInterface } from '../../domain/services/Isocket.io';

export class CreateFacturaUseCase{
    constructor(
        readonly FacturaRepository:FacturaRepository,
        readonly notification: NotificacionFacturaUseCase,
        readonly socket:ISocketIOInterface
    ){}
    async run(
        idFactura:string,
        pagoid:string
    ):Promise<Factura | null>{
        try {
            const factura = await this.FacturaRepository.createFactura(
                idFactura,
                pagoid
            )
            if(factura)this.notification.run(factura)
            this.socket.emit("suscribcion payment", factura);

            return factura;
        } catch (error) {
            return null;
        }
    }
}