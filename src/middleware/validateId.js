export function validateId(req, res, next){
    const id= Number(req.params.id);

    if (!Number.isInteger(id) || id<1){
        return res.status(400).json({error:'id must be a positive'})
    }

    req.id=id;
    next();
}