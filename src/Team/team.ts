// db.ts
const db = require("../dataabse/index");
import { Request, Response } from "express"; 

interface Team {
    id: string, 
    nome: string, 
    anoFundacao: Date, 
    idFavorito?: string,
    idEsporte: string, 
    idLiga : number[], 
    historicoJogador: number, 
}

  export async function addTeam(req: Request, res: Response): Promise<void> {
    try {
      const { id, nome, anoFundacao, idFavorito, idEsporte, idLiga, historicoJogador}: Team = req.body; 
  
      await db.query("SET search_path TO ryller_tv");
      const query = `
        INSERT INTO ryller_tv.time(
        idtime, 
        nome, 
        anofundacao, 
        idFavorito, 
        esporte_idEsporte, 
        liga_idLiga, 
        historico_jogador_id_historico_jogador
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
      const queryValues = [id, nome, anoFundacao, idFavorito, idEsporte, idLiga, historicoJogador];
      await db.query(query, queryValues);
  
      res.status(201).send("time adicionado com sucesso");
    } catch (error) {
      console.error("Erro ao adicionar time:", error);
      res.status(500).send("Erro interno no servidor");
    }
  }

  export async function getTeam(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params; 
  
      await db.query("SET search_path TO ryller_tv");
      const query = `
      SELECT *
      FROM ryller_tv.time
      WHERE idtime = $1`;
      const queryValues = [id];
      const result = await db.query(query, queryValues);
     
  
      if (result.length === 0) {
          res.status(404).send("ID de time não encontrado");
          return;
        }
  
        const user = result;
        res.status(200).json(user);
    } catch (error) {
      console.error("Erro ao encontrar time:", error);
      res.status(500).send("Erro interno no servidor");
    }
  }

  export async function updateTeam(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { nome, anoFundacao, idFavorito, idEsporte, idLiga, historicoJogador}: Team = req.body; 
  
      
  
      let query = 'UPDATE ryller_tv.time SET';
      const queryValues: any[] = [];
      let valueIndex = 1; 
  
      if (nome) {
        query += ` nome = $${valueIndex},`;
        queryValues.push(nome);
        valueIndex++;
      }
      if (anoFundacao) {
        query += ` anofundacao = $${valueIndex},`;
        queryValues.push(anoFundacao);
        valueIndex++;
      }
      if (idFavorito) {
        query += ` idFavorito = $${valueIndex},`;
        queryValues.push(idFavorito);
        valueIndex++;
      }

      if (idEsporte) {
        query += ` esporte_idEsporte = $${valueIndex},`;
        queryValues.push(idEsporte);
        valueIndex++;
      }

      if (idLiga) {
        query += ` liga_idLiga = $${valueIndex},`;
        queryValues.push(idLiga);
        valueIndex++;
      }

      if (historicoJogador) {
        query += ` historico_jogador_id_historico_jogador = $${valueIndex},`;
        queryValues.push(historicoJogador);
        valueIndex++;
      }

  
      query = query.slice(0, -1);
  
      query += ' WHERE idtime = $' + valueIndex;
      queryValues.push(id); 
  
      const result = await db.query(query, queryValues);
  
   
  
      const updatedTeam = result;
      res.status(200).json(updatedTeam);
    } catch (error) {
      console.error('Erro ao atualizar time:', error);
      res.status(500).send('Erro interno no servidor');
    }
  }


  export async function deleteTeam(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
  
      if (!id) {
        res.status(404).send('ID de time não encontrado');
        return;
      }
  
      await db.query('SET search_path TO ryller_tv');
      const query = `
          DELETE
          FROM ryller_tv.time
          WHERE idtime = $1`;
      const queryValues = [id];
      const result = await db.query(query, queryValues);
  

      res.status(200).send('Time deletado com sucesso');
    } catch (error) {
      console.error('Erro ao deletar time:', error);
      res.status(500).send('Erro interno no servidor');
    }
  }

  