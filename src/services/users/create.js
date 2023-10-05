import {supabase} from "../../createClient.js";
import { uuid } from "@supabase/supabase-js/dist/module/lib/helpers.js";

export async function createUser(name, age){
    try {
        const { data, error } = await supabase
            .from('users')
            .insert({
                id: uuid(),
                name,
                age
            });
        if (error){
            throw new Error(`O valor fornecidos no input é imcompativel com o banco de dados: ${error}`)
        }
    } catch (e) {
        throw new Error(` Não foi possivel criar o usuario, erro:  ${e}`)
    }
}