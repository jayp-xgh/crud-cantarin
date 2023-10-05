import {supabase} from "../../createClient.js";


export async function deleteUser(id){
   try {
       const { data, error } = await supabase
           .from('users')
           .delete()
           .eq('id', id)
   } catch (e) {
       throw new Error(` Não foi possivel deletar o usuario, erro:  ${e}`)
   }
}