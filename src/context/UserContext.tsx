import {createContext, type ReactNode, useState} from "react";

interface UserInfo {
    display_name: string;
    id: string;
    profile_url: string
    uri: string
}

interface UserInfoContextType {
    userInfo: UserInfo | null;
    setUserInfo: (user: UserInfo | null) => void;
}


const UserInfoContext = createContext<UserInfoContextType | undefined> (undefined)

const UserInfoProvider = ({ children }: { children: ReactNode }) => {

    // Cache user data
    const [userInfo, setUserInfoState] = useState<UserInfo | null>(() => {
        const stored = localStorage.getItem("userInfo");
        return stored ? JSON.parse(stored) : null;
    })

    // Sync localStorage
    const setUserInfo = (userInfo: UserInfo | null)=> {
        setUserInfoState(userInfo);
        if (userInfo) {
            localStorage.setItem("userInfo", JSON.stringify(userInfo))
        } else {
            localStorage.removeItem("userInfo")
        }
    }

    return (
        <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserInfoContext.Provider>
    )
}



export {UserInfoProvider, UserInfoContext};
