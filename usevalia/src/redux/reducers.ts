import { User } from '../components/Entities/User';
import { SET_USER, CLEAR_USER, SET_AUDIT, CLEAR_AUDIT } from './types';

//user = {id, rol}
interface State {
  user: User | {};
  audit: number | undefined;
}

const initialState: State = {
  user: {},
  audit: undefined,
};

export const userReducer = (state: State = initialState, action: any) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: {},
      };
    case SET_AUDIT:
      return {
        ...state,
        audit: action.payload,
      };
    case CLEAR_AUDIT:
      return {
        ...state,
        audit: undefined,
      };
    default:
      return state;
  }
};

