import db from  '../data/db.js'
import { AppError } from '../errors/AppError.js';

export function getAll(){
    return db.prepare('SELECT * FROM categories ORDER BY NAME').all();

}
export function getById(id){
    return db.prepare('SELECT * FROM categories WHERE id=?').get(id);
}
export function create(name){
    try {
        const result= db.prepare('INSERT INTO categories (name) VALUES (?)').run(name);
        return getById(result.lastInsertRowid)
    } catch (err) {
        if (err.code==='SQLITE_CONSTRAINT_UNIQUE'){
            throw new AppError(409,'A category with that name already exists','CATEGORY_EXISTS')
        }
        throw err;
    }
}

export function update(id, name){
try {
    const result=db.prepare('UPDATE categories SET name=? where id=?').run(name, id)
    if (result.changes===0){
        return undefined;
    }
} catch (err) {
    if (err.code==='SQLITE_CONSTRAINT_UNIQUE'){
        throw new AppError(409, 'A category with that name already exists')
    }
    throw err;
}
}
export function remove(id) {
  try {
    const result = db.prepare('DELETE FROM categories WHERE id = ?').run(id);
    return result.changes > 0;
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_FOREIGNKEY') {
      throw new AppError(409, 'Category is in use by existing transactions', 'CATEGORY_IN_USE');
    }
    throw err;
  }
}