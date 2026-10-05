import db from  '../data/db.js'

export function getAll(){
    return db.prepare('SELECT * FROM categories ORDER BY NAME').all();

}
export function getById(id){
    return db.prepare('SELECT * FROM categories WHERE id=?').get(id);
}
export function create(name){
    const result = db.prepare('INSERT INTO categories (name) VALUES(?)').run (name);
    return getById(result.lastInsertRowid);
}

export function update(id, name){
    const result=db.prepare('UPDATE categories SET name=? WHERE id = ?');

    if (result.changes===0){
        return undefined;
    }
    return getById(id);
}

export function remove(id){
    const result = db.prepare('DELETE from categories WHERE id =?').run(id);
    return result.changes > 0;
}