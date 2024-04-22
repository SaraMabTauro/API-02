import { NotificacionNewFactura } from "../../infraestructure/servicesRabbit/NotificacionNewFactura";
import { Factura } from "../../domain/entities/Factura";

export class NotificacionFacturaUseCase{
    constructor(readonly serviceNotification:NotificacionNewFactura){}
    async run(factura:Factura){
        await this.serviceNotification.sendNotification(factura)
    }
}