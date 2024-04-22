import amqplib from 'amqplib'
import { INotificationNewFactura } from '../../domain/services/INotificacionNewFactura'
import { Factura } from '../../domain/entities/Factura'
import { buffer } from 'stream/consumers';


export class NotificacionNewFactura implements INotificationNewFactura{
    private options: any;
    private url: any;
    private exch: any;
    private server: any;
    constructor() {
        this.options = {
          protocol:'amqp',
          username: 'guest',
          password:'guest',
          port: 5672,
            
        };
        this.url = 'amqp://guest:guest@107.23.187.32';
        this.exch = 'up.Chiapas.pendiente';
        //Options solo para cloudamqp
       // this.server = process.env.AMQP_SERVER;
      }
      async  sendNotification(factura: Factura): Promise<boolean> {
          try {
          const conn = await amqplib.connect(this.url);
          const ch =await conn.createChannel();
          
          const status = ch.publish(this.exch,"", Buffer.from(JSON.stringify(factura)))
         
          return status;
          } catch (error) {
            return false;
          }

      }
}