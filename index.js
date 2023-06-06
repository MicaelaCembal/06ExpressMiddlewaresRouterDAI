import express from 'express'; //npm i express
import config from './dbconfig.js'; 
import cors from 'cors' //npm i cors
import sql from 'mssql';
import PizzaRouter from "./src/controller/pizzaController.js";
import IngredientesXPizzasRouter from "./src/controller/IngredientesXPizzasController.js";
import IngredientesRouter from "./src/controller/IngredientesController.js";
import PizzaService from './src/services/pizzas-services.js'; 
import Pizza from './src/models/pizza.js'; 


const app = express();
//agrego los middlewares : son como los filtros para siga accediendo a las request
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

//
app.use("/api/pizzas", PizzaRouter)
app.use("/api/ingredientesxpizzas", IngredientesXPizzasRouter)
app.use("/api/ingredientes", IngredientesRouter)


const port = 3000;


 app.listen(port, () =>{

    console.log(`escuchando el puerto ${port}`);
 });