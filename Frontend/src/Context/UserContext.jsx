import React, { Children, useEffect } from "react";
import { createContext } from "react";
import { API_PATHS } from "../Utils/apiPaths";

export const UserContext=createContext();

const UserProvider=({Children})=>{
    const[User,setUser]=UserState(null)
    const[loading,setLoading]=UserState(true);
    useEffect(()=>{
        if(User)return

        const accessToken=localStorage.getItem('token')
        if(!accessToken){
            setLoading(false)
            return;
        }
        const fetchUser=async()=>{
            try{
                const response=await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE)
                setUser(response.data)
            }
            catch(error){
                console.error("User no authenticated",error)
                clearUser()
            }
            finally{
                setLoading(false)
            }
            
        };
        fetchUser();

    },[]);
    const updateuser=(userData)=>{
        setUser(userData)
        localStorage.setItem('token',userData.token)
        setLoading(false)
    }
    const clearUser=()=>{
        setUser(null)
        localStorage.removeItem('token')
    }
    return (
       <UserContext.Provider value={{user,loading,updateuser,clearUser}}>
       {Children}
       </UserContext.Provider>
    )
}
export default UserProvider;