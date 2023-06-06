import {Router} from 'express';
import PizzaService from '../services/pizzas-services.js';
import { ReasonPhrases, StatusCodes} from 'http-status-codes';

const router= Router();
let TODO = new PizzaService();

router.get('/', async function (req, res) {  
    let respuesta; 
    let pizzas = await TODO.getAll();
    if (pizzas!=null){
        respuesta = res.status(StatusCodes.OK).json(pizzas);
      } else {
        respuesta = res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error interno.`);
      }
    
      return respuesta;
    });
    

 router.get('/:id', async function (req, res) {  
    
    let respuesta;
    let incluirIngredientes =
      (typeof req.query.incluirIngredientes !== 'undefined' &&
      req.query.incluirIngredientes.toLowerCase() === 'true')

      let pizza = await TODO.getById(req.params.id, incluirIngredientes);
    if (pizza!=null){
        respuesta = res.status(StatusCodes.OK).json(pizza);
      } else {
        respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontro la Pizza (id:${req.params.id}).`);
      }
    
      return respuesta;
    });

 router.delete('/:id', async function (req, res) {  
    let respuesta;
    let registrosAfectados = await TODO.deleteById(req.params.id);
    if (registrosAfectados!=0){
        respuesta = res.status(StatusCodes.OK).json(respuesta);
    } else {
      respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontro la Pizza (id:${req.params.id}).`);
    }
    return respuesta;
  });


 router.put('/update', async function (req, res) { 
    let respuesta;
    let registrosAfectados = await TODO.update(req.body);
    if (registrosAfectados!=0){
        respuesta = res.status(StatusCodes.OK).send(`Se actualizo la pizza correctamente`);
    } else {
      respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontro la Pizza.`);
    }
    return respuesta;
  });


router.post('/insert', async function (req, res) { 
    let respuesta; 
    let registrosAfectados = await TODO.insert(req.body);
    if (registrosAfectados!=0){
        respuesta = res.status(StatusCodes.CREATED).json(registrosAfectados);
    } else {
        respuesta = res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error interno.`);
    }
    return respuesta;
  });

 export default router;