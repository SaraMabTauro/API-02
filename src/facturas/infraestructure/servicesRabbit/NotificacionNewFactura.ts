// import amqplib from 'amqplib'
// import { INotificationNewFactura } from '../../domain/services/INotificacionNewFactura'
// import { Factura } from '../../domain/entities/Factura'
// import { buffer } from 'stream/consumers';


// export class NotificacionNewFactura implements INotificationNewFactura{
//     private options: any;
//     private url: any;
//     private exch: any;
//     private server: any;
//     constructor() {
//         this.options = {
//           protocol:'amqp',
//           username: 'guest',
//           password:'guest',
//           port: 5672,
            
//         };
//         this.url = 'amqp://guest:guest@107.23.187.32';
//         this.exch = 'Prueba2';
//         //Options solo para cloudamqp
//        // this.server = process.env.AMQP_SERVER;
//       }
//       async  sendNotification(factura: Factura): Promise<boolean> {
//           try {
//           const conn = await amqplib.connect(this.url);
//           const ch =await conn.createChannel();
          
//           const status = ch.publish(this.exch,"", Buffer.from(JSON.stringify(factura)))
         
//           return status;
//           } catch (error) {
//             return false;
//           }

//       }
// }


import amqplib from 'amqplib'
import { INotificationNewFactura } from '../../domain/services/INotificacionNewFactura'
import { Factura } from '../../domain/entities/Factura'

export class NotificacionNewFactura implements INotificationNewFactura {
    private options: any;
    private url: any;
    private exch: any;
    private queue: any;

    constructor() {
        this.options = {
            protocol: 'amqp',
            username: 'guest',
            password: 'guest',
            port: 5672,
        };
        this.url = 'amqp://guest:guest@107.23.187.32';
        this.exch = 'Prueba2';
        this.queue = 'segundaCola';
    }

    async sendNotification(factura: Factura): Promise<boolean> {
        try {
            const conn = await amqplib.connect(this.url);
            const ch = await conn.createChannel();

            // Asegúrate de declarar el intercambio y la cola
            await ch.assertExchange(this.exch, 'direct', { durable: true });
            await ch.assertQueue(this.queue, { durable: true });

            // Enlaza la cola al intercambio
            await ch.bindQueue(this.queue, this.exch, '');

            // Publica el mensaje en el intercambio con la clave de enrutamiento vacía
            const status = ch.publish(this.exch, '', Buffer.from(JSON.stringify(factura)));

            return status;
        } catch (error) {
            console.error('Error al enviar la notificación:', error);
            return false;
        }
    }
}
