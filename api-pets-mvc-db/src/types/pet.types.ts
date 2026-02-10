//Tipo básico:Ajuda a padronizar os valores aceitos
export type Especie="cachorro"|"gato"|"outro"
//Modelo de dados do Pet (COMO EXISTE NO BANCO)
export type Pet={
    id:number
    nome:string
    especie:Especie
    idade:number
    tutor:string
    criado_em?:string
}