import { AppError } from "../errors/AppError.js";

export function errorHandler(err, req, res, next){
    if (err instanceof AppError){
        return res.status(err.status).json({error: err.message, code:err.code})
    }

    if (err.code==='SQLITE_CONSTRAINT_UNIQUE'){
        return res.status(409).json({error:'that value already exists'})
    }
    if (err.code==='SQLITE_CONSTRAINT_FOREIGNKEY'){
        return res.status(409).json({error:'this record is still referenced by other records'})
    }

    console.error(err);
    res.status(500).json({error:'something went wrong'})

}