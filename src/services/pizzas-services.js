import config from '../../dbconfig.js';
import sql from 'mssql';
import logHelper from './../modules/log-helper.js';

import IngredientesXPizzasService from "./ingredientesxpizzas-service.js";
const NOMBRE_SERVICE = 'PizzaService';
const NOMBRE_TABLA='Pizzas';

class PizzaService{
    getAll= async () => {
        //const fs = require('fs');
        let returnEntity= null;
        console.log('Estoy en: PizzaService.GetAll()');

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

    getById= async (id,incluirIngredientes) => {
        //const fs = require('fs');

        let returnEntity= null;
        console.log('Estoy en: PizzaService.GetById(id)');
        incluirIngredientes = incluirIngredientes || false; 

        try{
            let pool =await sql.connect(config);
            let result= await pool.request()
                            .input('pId', sql.Int, id)
                            .query (`SELECT * FROM ${NOMBRE_TABLA} WHERE id = @pId`);
            returnEntity = result.recordsets[0][0];



            if ((returnEntity!= null) && (incluirIngredientes)){
                let svc = new IngredientesXPizzasService(); 
                returnEntity.Ingredientes = await svc.getById(id);
            }
    }
        catch (error){
            logHelper.logError(` ${NOMBRE_SERVICE}->getById`, error);
        }
        return returnEntity;
    }

    insert= async (pizza) => {
        //const fs = require('fs');
        let rowsAffected = 0; 
        console.log('Estoy en: PizzaService.insert(pizza)');

        try{
            let pool = await sql.connect(config); 
            let result = await pool.request()
           
                            
                            .input('pNombre', sql.VarChar, pizza?.Nombre ?? '')
                            .input('pLibreGluten', sql.Bit, pizza?.LibreGluten ?? false)
                            .input('pImporte', sql.Int, pizza?.Importe ?? 0)
                            .input('pDescripcion', sql.VarChar, pizza?.Descripcion ?? '')
                            .query (`INSERT INTO ${NOMBRE_TABLA} (Nombre,LibreGluten,Importe,Descripcion) VALUES (@pNombre,@pLibreGluten,@pImporte,@pDescripcion) `);
           
            rowsAffected= result.rowsAffected;
        }

        catch (error){
            logHelper.logError(` ${NOMBRE_SERVICE}->insert`, error);
        }
    return rowsAffected;
    }

    update= async (pizza) => {
        //const fs = require('fs');
        let rowsAffected = 0; 
        console.log('Estoy en: PizzaService.update(pizza)');

        try{
            let pool = await sql.connect(config); 
            let result = await pool.request()
           
                            .input('pId', sql.Int, pizza?.Id ?? 0)
                            .input('pNombre', sql.VarChar, pizza?.Nombre ?? '')
                            .input('pLibreGluten', sql.Bit,pizza?.LibreGluten ?? false)
                            .input('pImporte', sql.Int, pizza?.Importe ?? 0)
                            .input('pDescripcion', sql.VarChar, pizza?.Descripcion ?? '')
                            .query (`UPDATE ${NOMBRE_TABLA}  SET Nombre=@pNombre, LibreGluten = @pLibreGluten, Importe = @pImporte, Descripcion=@pDescripcion WHERE Id=@pId`);
           
            rowsAffected= result.rowsAffected;
        }

        catch (error){
            logHelper.logError(` ${NOMBRE_SERVICE}->update`, error);
        }
    return rowsAffected;
        
    }

    deleteById= async (id) => {
        //const fs = require('fs');
        let rowsAffected = 0; 
        console.log('Estoy en: PizzaService.deleteById(id)');

        try{
            let pool = await sql.connect(config); 
            let result = await pool.request()
                            .input('pId', sql.Int, id)
                            .query (`DELETE FROM ${NOMBRE_TABLA} WHERE id = @pId`);
           
            rowsAffected= result.rowsAffected;
        }

        catch (error){
            logHelper.logError(` ${NOMBRE_SERVICE}->deleteById`, error);
        }
    return rowsAffected;
    }
}

export default PizzaService;