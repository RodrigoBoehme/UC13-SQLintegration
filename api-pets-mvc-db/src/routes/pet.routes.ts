import { Router } from "express";

import { PetController } from "../controller/pet.controller";

//Cria o "roteador"
export const petRoutes=Router()
/**
 * Cada rota abaixo representa um endpoint da API
 * Elas serão chamadas pelo fetch do front-end 
 */

petRoutes.get("/api/pets",PetController.listApi)
//busca por id
petRoutes.get("/api/pets/:id",PetController.getByIdApi)
petRoutes.post("/api/pets",PetController.createApi)
petRoutes.put("/api/pets/:id",PetController.updateApi)
petRoutes.delete("/api/pets/:id",PetController.removeApi)