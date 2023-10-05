import React, { useEffect, useState } from 'react';
import { supabase } from './createClient.js';
import userServices from "./services/users/index.js";
import {listAllUsers} from "./services/users/listAll.js";

const App = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({
        name: '',
        age: ''
    });

    function hendlerChange(e){
        setUser(prevFormData=> {
            return {
                ...prevFormData,
                [event.target.name]:event.target.value
            }
        })
    }

    function validateUser(message) {
        if (user.name === '' || user.age === ''  ||  isNaN(Number(user.age))) {
            alert('Não é possivel criar o usuário sem as informações necessárias');
            return false
        }
        return true
    }

    async function createUser(){
        if (!validateUser()) return;
        await userServices.createUser(user.name, user.age).catch((error) => {
            return alert('Não é possivel criar o usuário sem as informações necessárias');
        });
        setUser({ name: '', age: ''})
        listAllUsers()
    }
    async function deleteUser(id){
        await userServices.deleteUser(id).catch((error) => {
            return alert('Não foi possível deletar os usuários');
        });
        listAllUsers()
    }
    async function updateUser(){
        if (!user.id) return alert('Não é possivel atualizar um usuário sem id');
        await userServices.updateUser(user.id, user.name, user.age).catch((error) => {
            return alert('Não foi possível atualizar os usuários');
        });
        setUser({ name: '',  age: ''})
        listAllUsers()
    }
    async function listAllUsers(){
        let allUsers = await  userServices.listAllUsers().catch((error) => {
            alert('Não foi possível listar os usuários');
        });
        setUsers(allUsers)
    }
    async function getUser(id){
        let targetUser= await userServices.getUser(id).catch((error) => {
            alert('Não foi encontrar o usuário');
        });
        if (!targetUser.length){
            alert('Não foi encontrar o usuário');
            return
        }
        setUser({
            id,
            name: targetUser[0].name,
            age:targetUser[0].age
        })
    }

    useEffect(() => {
        listAllUsers()
    }, []);

    return (
        <div className="flex flex-col gap-[20px] justify-center items-center min-h-[100vh] ">
            <form onSubmit={(e) => e.preventDefault() } className="flex flex-col gap-[20px] justify-center">
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={hendlerChange}
                    value={user.name || ''}
                    placeholder="Name"
                    type="text"
                    name="name"
                    required
                />
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={hendlerChange}
                    value={user.age || ''}
                    placeholder="Age"
                    type="number"
                    name="age"
                    required
                />
                <div className="w-96 h-18 flex gap-[20px]">
                    <button
                        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        type="submit"
                        onClick={() => { updateUser(user.id) }}>Save Changes
                    </button>
                    <button
                        className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                        type="submit"
                        onClick={createUser}>Create
                    </button>
                </div>
            </form>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead  className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 bg-teal-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Id</th>
                            <th scope="col" className="px-6 py-3" >Name</th>
                            <th scope="col" className="px-6 py-3"> Age</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) =>
                                <tr key = {user.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <th  scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.id}</th>
                                    <th className="px-6 py-4">{user.name}</th>
                                    <th className="px-6 py-6">{user.age}</th>
                                    <th>
                                        <button
                                            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                            onClick = { () => { deleteUser(user.id) }}>Delete</button>

                                        <button
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline w-[100px]"
                                            onClick = { () => { getUser(user.id) }}>
                                            Edit</button>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
  );
}
export default App;