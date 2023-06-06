import {Router} from 'express';
import UnidadesService from '../services/unidades-service.js';
import { ReasonPhrases, StatusCodes} from 'http-status-codes';

const router= Router();
let TODO = new UnidadesService();

router.get('/', async function (req, res) {  
    let respuesta; 
    let unidades = await TODO.getAll();
    if (unidades!=null){
        respuesta = res.status(StatusCodes.OK).json(unidades);
      } else {
        respuesta = res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error interno.`);
      }
    
      return respuesta;
    });
    

 router.get('/:id', async function (req, res) {  
    
    let respuesta;


      let unidades = await TODO.getById(req.params.id);
    if (unidades!=null){
        respuesta = res.status(StatusCodes.OK).json(unidades);
      } else {
        respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontro el ingrediente (id:${req.params.id}).`);
      }
    
      return respuesta;
    });

 export default router;