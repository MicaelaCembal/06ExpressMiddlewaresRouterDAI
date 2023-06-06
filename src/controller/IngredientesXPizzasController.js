import {Router} from 'express';
import PizzaService from '../services/pizzas-services.js';
import { ReasonPhrases, StatusCodes} from 'http-status-codes';
import IngredientesXPizzasService from '../services/ingredientesxpizzas-service.js';

const router= Router();

let TODO = new IngredientesXPizzasService();

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
   let id = req.params.id; 

      let pizza = await TODO.getById(id);
    if (pizza!=null){
        respuesta = res.status(StatusCodes.OK).json(pizza);
      } else {
        respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontro la Pizza (id:${req.params.id}).`);
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

