import { useAuth as useAuthContext } from '../contexts/AuthContext';
import { auth } from '../../firebase';

export function useAuth() {
  const { currentUser, setCurrentUser } = useAuthContext();

  return {
    currentUser,
    setCurrentUser,
    login: async (email, password) => auth.signInWithEmailAndPassword(email, password),
    logout: async () => auth.signOut(),
    signup: async (email, password) => auth.createUserWithEmailAndPassword(email, password),
  };
}
