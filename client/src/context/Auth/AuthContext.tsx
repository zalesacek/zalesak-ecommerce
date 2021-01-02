import { createContext } from 'react';
import { IAuth } from '../../app/Types';

const AuthContext = createContext<IAuth>({} as IAuth);

export default AuthContext;