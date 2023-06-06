import express from 'express'; //npm i express
import config from './dbconfig.js'; 
import cors from 'cors' //npm i cors
import sql from 'mssql';
import PizzaRouter from "./src/controller/pizzaController.js";
import IngredientesXPizzasRouter from "./src/controller/IngredientesXPizzasController.js";
import IngredientesRouter from "./src/controller/IngredientesController.js";
import UnidadesRouter from "./src/controller/UnidadesController.js";
import PizzaService from './src/services/pizzas-services.js'; 
import Pizza from './src/models/pizza.js'; 


const app = express();
//agrego los middlewares : son como los filtros para siga accediendo a las request
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

//


const port = 3000;

//Un Middleware que muestre por consola el tiempo transcurrido (hasta milisegundos) en que fue procesada una peticion.
// función de Middleware (notar que hay un next!) 
// Middleware para validar la API key
const validarApiKey = (req, res, next) => {
   const apiKey = req.headers['api-key'];
 
   // Aquí puedes implementar tu lógica de validación de la API key
   // Por ejemplo, verificar si la clave es válida en una base de datos o en una lista blanca
 
   if (apiKey === '123456789') {
     next(); // API key válida, continúa al siguiente middleware o ruta
   } else {
     return res.status(401).send('Unauthorized, es necesario una ApiKey Valida.'); // API key inválida, devuelve un error de autorización
   }
 };
 
 // Middleware para validar la API key en todas las rutas
 app.use(validarApiKey);
 


  app.use("/api/pizzas", PizzaRouter )
  app.use("/api/ingredientesxpizzas", IngredientesXPizzasRouter)
  app.use("/api/ingredientes", IngredientesRouter)
  app.use("/api/unidades", UnidadesRouter)

 app.listen(port, () =>{

    console.log(`escuchando el puerto ${port}`);
 });