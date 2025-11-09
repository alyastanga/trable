import {
    createContext,
    FC,
    ReactNode,
    useCallback,
    useEffect,
    useState
} from "react";

type User = {
    email: string;
    role?: string;
};

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    error: Error | null;
    refetch: () => void;
    setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: false,
    error: null,
    refetch: () => {},
    setUser: () => {}
});

const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const refetch = useCallback(() => {}, []);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <AuthContext.Provider
            value={{ user, isLoading, error, refetch, setUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
