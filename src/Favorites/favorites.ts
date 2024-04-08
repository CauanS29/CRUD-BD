// db.ts
const db = require("../dataabse/index");
import { Request, Response } from "express"; 


interface Favorite {
    idUsuario: Number, 
    idFavoritos: Number
}

export async function addFavorite(req: Request, res: Response): Promise<void> {
    const client = await db.connect();

    try {
        await client.query('BEGIN');

        const { idUsuario, idFavoritos }: Favorite = req.body;

        const query = 'INSERT INTO favoritos_usuario (idUsuario, idFavoritos) VALUES ($1, $2) RETURNING *';
        const queryValues = [idUsuario, idFavoritos];

        await client.query(query, queryValues);

        await client.query('COMMIT');

        res.status(201).send('Favorito adicionado com sucesso');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Erro ao adicionar favorito:', error);
        res.status(500).send('Erro interno no servidor');
    } finally {
        client.release();
    }
}

  export async function getFavorites(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params; 
  
      await db.query("SET search_path TO ryller_tv");
      const query = `
      SELECT *
      FROM ryller_tv.favoritos_usuario
      WHERE idusuario = $1`;
      const queryValues = [id];
      const result = await db.query(query, queryValues);
     
  
        const user = result;
        res.status(200).json(user);
    } catch (error) {
      console.error("Erro ao encontrar time:", error);
      res.status(500).send("Erro interno no servidor");
    }
  }

  export async function updateFavorite(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { idFavoritos } = req.body; 
  
      let query = 'UPDATE ryller_tv.favoritos_usuario SET';
      const queryValues: any[] = [];
      let valueIndex = 1; 
  
      if (idFavoritos) {
        query += ` idFavoritos = $${valueIndex},`;
        queryValues.push(idFavoritos);
        valueIndex++;
      }
      
      query = query.slice(0, -1);
  
      query += ' WHERE idusuario = $' + valueIndex;
      queryValues.push(id); 
  
      const result = await db.query(query, queryValues);
  
   
      const updatedFavorite = result;
      res.status(200).json(updatedFavorite);
    } catch (error) {
      console.error('Erro ao atualizar favoritos:', error);
      res.status(500).send('Erro interno no servidor');
    }
  }

  export async function deleteFavorite(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
  
      await db.query('SET search_path TO ryller_tv');
      const query = `
          DELETE
          FROM ryller_tv.favoritos_usuario
          WHERE idusuario = $1`;
      const queryValues = [id];
      const result = await db.query(query, queryValues);
  
      res.status(200).send('Favorito deletado com sucesso');
    } catch (error) {
      console.error('Erro ao deletar favorito:', error);
      res.status(500).send('Erro interno no servidor');
    }
  }

  