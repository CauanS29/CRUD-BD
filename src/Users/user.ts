// db.ts
const db = require("../dataabse/index");
import { Request, Response } from "express"; // Importe Request e Response do Express

interface User {
  id: string;
  nome: string;
  email: string;
  senha: string;
}

export async function getUser(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    

    await db.query("SET search_path TO ryller_tv");
    const query = `
        SELECT *
        FROM ryller_tv.usuario
        WHERE id = $1`;
    const queryValues = [id];
    const result = await db.query(query, queryValues);
   

    if (result.length === 0) {
        res.status(404).send("ID de usuário não encontrado");
        return;
      }

    const user = result;
    res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao obter usuário:", error);
    res.status(500).send("Erro interno no servidor");
  }
}

export async function addUser(req: Request, res: Response): Promise<void> {
  try {
    const { id, nome, email, senha }: User = req.body; // Extrair os dados do body

    await db.query("SET search_path TO ryller_tv");
    const query = `
      INSERT INTO ryller_tv.usuario
      (id, nome, email, senha) VALUES ($1, $2, $3, $4)`;
    const queryValues = [id, nome, email, senha];
    await db.query(query, queryValues);

    res.status(201).send("Usuário adicionado com sucesso");
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error);
    res.status(500).send("Erro interno no servidor");
  }
}


export async function updateUser(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { nome, email, senha }: User = req.body;

    if (!id) {
      res.status(404).send('ID de usuário não encontrado');
      return;
    }

    let query = 'UPDATE ryller_tv.usuario SET';
    const queryValues: any[] = [];
    let valueIndex = 1; 

    if (nome) {
      query += ` nome = $${valueIndex},`;
      queryValues.push(nome);
      valueIndex++;
    }
    if (email) {
      query += ` email = $${valueIndex},`;
      queryValues.push(email);
      valueIndex++;
    }
    if (senha) {
      query += ` senha = $${valueIndex},`;
      queryValues.push(senha);
      valueIndex++;
    }

    query = query.slice(0, -1);

    query += ' WHERE id = $' + valueIndex;
    queryValues.push(id); 

    const result = await db.query(query, queryValues);

    if (result.length === 0) {
        res.status(404).send("ID de usuário não encontrado");
        return;
    }

   

    const updatedUser = result;
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).send('Erro interno no servidor');
  }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
  
      if (!id) {
        res.status(404).send('ID de usuário não encontrado');
        return;
      }
  
      await db.query('SET search_path TO ryller_tv');
      const query = `
          DELETE
          FROM ryller_tv.usuario
          WHERE id = $1`;
      const queryValues = [id];
      const result = await db.query(query, queryValues);
  
      if (result.length === 0) {
        res.status(404).send("ID de usuário não encontrado");
        return;
      }
  
      res.status(200).send('Usuário deletado com sucesso');
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      res.status(500).send('Erro interno no servidor');
    }
  }


