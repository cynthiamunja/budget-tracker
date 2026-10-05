import * as categoriesModel from '../models/categories.model.js'

export function getAllCategories(req, res){
    const categories= categoriesModel.getAll();
    res.json(categories);

}

export function createCategory(req, res){
    const {name}=req.body;

    if (typeof name !='string' || name.trim===''){
    return res.status(400).json({error:'name is required'});
}
try {
    const category=categoriesModel.create(name.trim())
    res.status(201).json(category);
} catch (err) {
    if (err.code==='SQLITE_CONSTRAINT_UNIQUE'){
        return res.status(409).json({error:'category already exists'})
    }
    throw err
}
}

export function updateCategory(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id must be a positive integer' });
  }

  const { name } = req.body;

  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'name is required' });
  }

  try {
    const category = categoriesModel.update(id, name.trim());
    if (!category) {
      return res.status(404).json({ error: 'category not found' });
    }
    res.json(category);
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ error: 'category already exists' });
    }
    throw err;
  }
}


export function deleteCategory(req, res) {
  try {
    const deleted = categoriesModel.remove(req.id);
    if (!deleted) {
      return res.status(404).json({ error: 'category not found' });
    }
    res.status(204).send();
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_FOREIGNKEY') {
      return res.status(409).json({ error: 'cannot delete category that is in use by existing transactions' });
    }
    throw err;
  }
}