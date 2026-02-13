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
            "SELECT * FROM pets ORDER BY id DESC"
        )
        //Retorna as linhas encontradas 
        return rows
    } 
    //Busca um pet especifico pelo id
    static async findById(id:number){
        //Executa um SELECT com parâmetro
        //O ? é um placholder para evitar SQL Injection
        const [rows]:any=await pool.execute(
            "SELECT * FROM pets WHERE id=?",[id]
            //neste caso substitui o ? pelo valor do id 
        )
        //O banco sempre retorna lista
        //Se existir pelo menos 1 resultado:
        //Retorna o primeiro
        //Se não existir: retorna null
        return rows.length ? rows[0]: null
    }
    //Criar
    static async create(
        nome:string,
        especie:string,
        idade:number,
        tutor:string
    ){
      //INSERT INTO -> insere dados na tabela
      //VALUES(?, ?, ?, ?)=> valores parametrizados
      await pool.execute(
        "INSERT INTO pets(nome, especie, idade, tutor) VALUES( ?, ?, ?, ?)",[nome,especie,idade,tutor]
      )
      //Não retorna nada aqui, apenas grava no banco 
    }
    //Atualiza um pet existente
    static async update(
        id:number,
        nome:string,
        especie:string,
        idade:number,
        tutor:string
    ){
        //UPDATE -> altera os dados existentes
        //SET -> define novos valores
        //WHERE id = ? -> garante que só um pet será atualizado
        await pool.execute(
            "UPDATE pets SET nome = ?, especie = ?,idade = ?, tutor = ? WHERE id =?",[nome,especie,idade,tutor,id]
        )
        //Também não retorna nada, apenas executa a atualização
    }
    //Remove um pet pelo id
    static async remove(id:number){
        //DELETE -> remove do banco
        const [result]:any=await pool.execute(
            "DELETE FROM pets WHERE id=?",[id]
        )
        //result.addectedRows informa quantas linhas foram apagadas
        //Se for maior que 0, deletou com sucesso
        return result.affectedRows>0
    }
}
