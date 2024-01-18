import { createContext, useEffect, useState } from "react";
import { baseUrl , getRequest ,postRequest} from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({children, user}) => {
    const [userChats , setUserChats] = useState(null);
    const [isUserChatsLoading , setIsUserChatLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);

    useEffect(() =>{
       const getUserChats = async()=>{
          if(user?._id){

            setIsUserChatLoading(true);
            setUserChatsError(null);

            const response = await getRequest(`${baseUrl}/chats/${user?._id}`)

            setIsUserChatLoading(false);

            if (response.error){
                return setUserChatsError(response)
            }

            setUserChats(response)
          }
       }

       getUserChats()
    }, [user])

    return (
     <ChatContext.Provider value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
    }}
    >
        {children}
        </ChatContext.Provider>
    )
}