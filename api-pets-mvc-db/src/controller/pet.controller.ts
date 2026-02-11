import { Request,Response} from "express"
import { PetModel } from "../models/pet.model"

export class PetController{
    //=====================
    //GET -> listar lets
    //=====================
    static async listApi(req:Request,res:Response){
        const pets=await PetModel.findAll()

        
        //Devolve JSON para o fetch
        return res.json(pets)
    }                        
    
    //=============================
    //GET por ID -> listar pets ID
    //=============================
    
    static async getByIdApi(req:Request,res:Response){
        const id =Number(req.params.id)
        const pet=await PetModel.findById(id)

        if(!pet)return res.status(404).json({erro:"Pet não encontrado"})
        return res.json(pet)
    }
    //=====================    
    //POST ->Criar
    //=====================
    
    static async createApi(req:Request,res:Response){
        const {nome,especie,idade,tutor}=req.body
        if(!nome||nome.trim().length<3){
            return res.status(400).json({erro:"Nome Invalido"})
        }
        const novo=await PetModel.create(nome,especie,Number(idade),tutor)
        return res.status(201).json(novo)
    }
    //=============================
    // PUT -> Atualizar
    //=============================
    static async updateApi(req:Request,res:Response){
        const id=Number(req.params.id)
        const {nome,especie,idade,tutor}=req.body

        const existe=await PetModel.findById(id)
        
        if(!existe)return res.status(400).json({erro:"Pet não encontrado"})

        const atualizado =await PetModel.update(id,nome,especie,Number(idade),tutor)
      return res.json(atualizado)
    }
    //===================
    //DELETE -> remover
    //===================
    static async removeApi(req:Request,res:Response){
        const id=Number(req.params.id)
        const ok=await PetModel.remove(id)

        if(!ok)return res.status(404).json({erro:"Pet não encontrado"})
        return res.status(204).send()
    }
}