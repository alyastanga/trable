import {
    createContext,
    FC,
    ReactNode,
    useCallback,
    useEffect,
    useState
} from "react";

type User = {};

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    error: Error | null;
    refetch: () => void;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: false,
    error: null,
    refetch: () => {}
});

const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const refetch = useCallback(() => {}, []);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <AuthContext.Provider value={{ user, isLoading, error, refetch }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
