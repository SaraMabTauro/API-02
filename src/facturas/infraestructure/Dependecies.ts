import { CreateFacturaUseCase } from "../aplication/methodsFactura/CreateFacturaUseCase";
import { CreateFactureController } from "./controllers/CreateFacturaController";
import { MysqlFacturaRepository } from "./repository/MysqlFacturaRepository";
import { NotificacionNewFactura } from "./servicesRabbit/NotificacionNewFactura";
import { NotificacionFacturaUseCase} from '../aplication/services/NotificacionNewFactura';
import { SocketIO } from "./services/socket.io";
const socketIO = new SocketIO();


export const mysqlFacturaRepository =  new MysqlFacturaRepository();
export const servicesNotification = new NotificacionNewFactura();
export const serviceNotificationUseCase = new NotificacionFacturaUseCase(
    servicesNotification
)
export const createFacturaUseCase =  new CreateFacturaUseCase(
    mysqlFacturaRepository,serviceNotificationUseCase,socketIO
)
export const createFacturaController = new CreateFactureController(
    createFacturaUseCase
)