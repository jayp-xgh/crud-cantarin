import {supabase} from "../../createClient.js";

export async function listAllUsers(){
    try {
        const { data } = await supabase
            .from('users')
            .select('id, name, age')
        return data
    } catch (e) {
        throw new Error(` Não foi possivel listar os usuarios, erro:  ${e}`)
    }
}