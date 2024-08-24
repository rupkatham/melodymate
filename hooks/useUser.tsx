import { createContext, useState, useEffect, useContext } from "react";
import { User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { UserDetails } from "@/types";



type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props {
    [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase
    } = useSessionContext();
    const [user, setUser] = useState<User | null>(null);
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails| null>(null);

 
    const getUserDetails = () => supabase.from('user').select('*').single();

    const getUser = async () => {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
            console.error('Error fetching user:', error.message);
            return null;
        }
        return data.user;
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const userFromAuth = await getUser();
            if (userFromAuth) {
                setUser(userFromAuth);
                if (!isLoadingData && !userDetails) {
                    setIsLoadingData(true);
                    const userDetailsResult = await getUserDetails();
                    if (userDetailsResult.error) {
                        console.error('Error fetching user details:', userDetailsResult.error);
                        setUserDetails(null);
                    } else {
                        setUserDetails(userDetailsResult.data as UserDetails);
                    }
                    setIsLoadingData(false);
                }
            } else if (!isLoadingUser && !isLoadingData) {
                setUserDetails(null);
            }
        };

        fetchUserData();
    }, [user, isLoadingUser]);

    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
    };

    return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a MyUserContextProvider');
    }
    return context;
};
