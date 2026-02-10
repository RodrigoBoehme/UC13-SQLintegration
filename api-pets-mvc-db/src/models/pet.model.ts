//Importa o pool de conexoes com o banco e dados
//Esse pool gerencia as conexoes do MySQL (abre,reutiliza e fecha)
import { pool } from "../database/connection";

//Model: classe responsavel somente por trabalhar e acessar o banco (SQL)

export class PetModel{
    //Metodo estatico (não precisa instanciar a classe)
    //Busca todos os pets no banco
    static async findAll(){
        //Executa um SQL no banco 
        // SELECT * - pega todas as colunas
        // ORDER BY id DESC ordena do maior id para o menor (mais recente primeiro)
        const [rows]=await pool.execute(
            "SELECT * FROM pets ORDER BY od DESC"
        )
        //Retorna as linhas encontradas 
        return rows
    } 
    //Busca um pet especifico pelo id
    static async findById(id:number){
        //Executa um SELECT com parâmetro
        //O ? é um placholder para evitar SQL Injection
        const [rows]:any=await pool.execute(
            "SELECT * FROM pets WHERE id=?}",[id]
            //neste caso substitui o ? pelo valor do id 
        )
        //O banco sempre retorna lista
        //Se existir pelo menos 1 resultado:
        //Retorna o primeiro
        //Se não existir: retorna null
        return rows.length ? rows[0]: null
    }
}
