// db.ts
const db = require("../dataabse/index");
import { Request, Response } from "express"; // Importe Request e Response do Express

interface Sport {
    id: number;
    ligas: string[];
    times: string[];
    jogadres: string[];
}

  export async function addSport(req: Request, res: Response): Promise<void> {
    try {
      const { id, ligas, times, jogadres}: Sport = req.body; 
  
      await db.query("SET search_path TO ryller_tv");
      const query = `
        INSERT INTO ryller_tv.time(
        idesporte, 
        Ligas, 
        Times, 
        Jogadores
        ) VALUES ($1, $2, $3, $4)`;
      const queryValues = [id, ligas, times, jogadres];
      await db.query(query, queryValues);
  
      res.status(201).send("esporte adicionado com sucesso");
    } catch (error) {
      console.error("Erro ao adicionar esporte:", error);
      res.status(500).send("Erro interno no servidor");
    }
  }