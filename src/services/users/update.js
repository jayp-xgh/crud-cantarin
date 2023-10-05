import {supabase} from "../../createClient.js";
import userServices from "./index.js";

export async function updateUser(id, name, age){
    if ( !await userServices.getUser(id)) return
    try {
        await supabase
            .from('users')
            .update({ name, age })
            .eq('id', id)
    } catch (e) {
        throw new Error(`Não foi possivel atualizar o usuario, erro:  ${e}`)
    }
}