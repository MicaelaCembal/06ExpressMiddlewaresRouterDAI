import config from '../../dbconfig.js';
import sql from 'mssql';
import logHelper from './../modules/log-helper.js';

const NOMBRE_SERVICE = 'IngredientesXPizzasService';
const NOMBRE_TABLA='IngredientesXPizzas';

class IngredientesXPizzasService{
    getAll= async () => {
        //const fs = require('fs');
        let returnEntity= null;
        console.log(`Estoy en: ${NOMBRE_SERVICE}.GetAll()`);

        try{
            let pool =await sql.connect(config);
            let result= await pool.request()
                            .query (`SELECT * FROM ${NOMBRE_TABLA}`);
            returnEntity = result.recordsets[0];

        }
        catch (error){
            logHelper.logError(` ${NOMBRE_SERVICE}->getAll`, error);
        }
        return returnEntity;
    }

    getById= async (id) => {
        //const fs = require('fs');

        let returnEntity= null;
        let sqlText= null;
        sqlText = `SELECT
        IngredientesXPizzas.Id              AS IdRelacion,
        Pizzas.Id                           AS IdPizza,
        Ingredientes.Id                     AS IdIngrediente,
        Ingredientes.Nombre                 AS Nombre,
        IngredientesXPizzas.Cantidad        AS Cantidad, 
        Unidades.Id                         AS IdUnidad,
        Unidades.Nombre                     AS Unidad
        FROM IngredientesXPizzas
        INNER JOIN Ingredientes ON IngredientesXPizzas.IdIngrediente = Ingredientes.Id
        INNER JOIN Pizzas ON IngredientesXPizzas.IdPizza = Pizzas.Id
        INNER JOIN Unidades ON IngredientesXPizzas.IdUnidad = Unidades.Id
        WHERE IdPizza = @pId`; 
        
        try{
            let pool =await sql.connect(config);
            let result= await pool.request()
                            .input('pId', sql.Int, id)
                            .query (sqlText);
            returnEntity = result.recordsets;
         
    }
        catch (error){
            logHelper.logError(` ${NOMBRE_SERVICE}->getById`, error);
        }
        return returnEntity;
    }

    


}

export default IngredientesXPizzasService; 