import config from '../../dbconfig.js';
import sql from 'mssql';
import logHelper from './../modules/log-helper.js';

const NOMBRE_SERVICE = 'IngredienteService';
const NOMBRE_TABLA='Ingredientes';

class IngredienteService{
    getAll= async () => {
        //const fs = require('fs');
        let returnEntity= null;
        console.log(` ${NOMBRE_SERVICE}.GetAll()`);

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
        console.log(` ${NOMBRE_SERVICE}.GetById(id)`);
       

        try{
            let pool =await sql.connect(config);
            let result= await pool.request()
                            .input('pId', sql.Int, id)
                            .query (`SELECT * FROM ${NOMBRE_TABLA} WHERE id = @pId`);
            returnEntity = result.recordsets[0][0];
    }
        catch (error){
            logHelper.logError(` ${NOMBRE_SERVICE}->getById`, error);
        }
        return returnEntity;
    }

    deleteById= async (id) => {
        //const fs = require('fs');
        let rowsAffected = 0; 
        console.log(` ${NOMBRE_SERVICE}.deleteById(id)`);

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

    update= async (ingrediente) => {
        //const fs = require('fs');
        let rowsAffected = 0; 
        console.log(` ${NOMBRE_SERVICE}.update(ingrediente)`);

        try{
            let pool = await sql.connect(config); 
            let result = await pool.request()
           
                            .input('pId', sql.Int, ingrediente?.Id ?? 0)
                            .input('pNombre', sql.VarChar, ingrediente?.Nombre ?? '')
                            .query (`UPDATE ${NOMBRE_TABLA}  SET Nombre=@pNombre WHERE Id=@pId`);
           
            rowsAffected= result.rowsAffected;
        }

        catch (error){
            logHelper.logError(` ${NOMBRE_SERVICE}->update`, error);
        }
    return rowsAffected;
        
    }

    insert= async (ingrediente) => {
        //const fs = require('fs');
        let rowsAffected = 0; 
        console.log(` ${NOMBRE_SERVICE}.insert(ingrediente)`);

        try{
            let pool = await sql.connect(config); 
            let result = await pool.request()
           
                            
                            .input('pNombre', sql.VarChar, ingrediente?.Nombre ?? '')
                            .query (`INSERT INTO ${NOMBRE_TABLA} (Nombre) VALUES (@pNombre) `);
           
            rowsAffected= result.rowsAffected;
        }

        catch (error){
            logHelper.logError(` ${NOMBRE_SERVICE}->insert`, error);
        }
    return rowsAffected;
    }
   

   
}

export default IngredienteService;