import {supabase} from "../../createClient.js";

export async function getUser(id){

    try {
        const { data, error } = await supabase
            .from('users')
            .select('name, age')
            .eq('id', id)
        return data
    } catch (e) {
        throw new Error(` Não foi possivel achar o usuario, erro:  ${e}`)
    }
}