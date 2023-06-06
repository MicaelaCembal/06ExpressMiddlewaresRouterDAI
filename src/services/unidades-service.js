import config from '../../dbconfig.js';
import sql from 'mssql';
import logHelper from './../modules/log-helper.js';

const NOMBRE_SERVICE = 'UnidadesService';
const NOMBRE_TABLA='Unidades';

class UnidadesService{
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


}

export default UnidadesService;