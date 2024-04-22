import express from 'express';
import { createFacturaController } from '../Dependecies';
export const facturaRouter = express.Router()

facturaRouter.post(
    '/',
    createFacturaController.run.bind(createFacturaController)
)