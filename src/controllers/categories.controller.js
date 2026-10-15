import * as categoriesModel from '../models/categories.model.js'

export function getAllCategories(req, res){
    const categories= categoriesModel.getAll();
    res.json(categories);

}

export function createCategory(req, res){
  const {name}=req.body;
  if (typeof name!=='string'|| name.trim()===''){
    return res.status(400).json({error:'name is required'})
  } 
  const category= categoriesModel.create(name.trim())
  res.status(201).json(category)
}

export function updateCategory(req, res) {
  const { name } = req.body;

  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'name is required' });
  }

  const category = categoriesModel.update(req.id, name.trim());

  if (!category) {
    return res.status(404).json({ error: 'category not found' });
  }

  res.json(category);
}


export function deleteCategory(req, res){
  const deleted =categoriesModel.remove(req.id)

if (!deleted){
  return res.status(404).json({error: 'category not found'})
}

res.status(204).send();
}