import { User } from '../components/Entities/User';
import { SET_USER, CLEAR_USER, SET_AUDIT, CLEAR_AUDIT } from './types';

export const setUser = (user: User) => {
  return {
    type: SET_USER,
    payload: user,
  };
};
export const clearUser = () => {
  return {
    type: CLEAR_USER,
  };
};

export const setAudit = (audit: number) => {
  return {
    type: SET_AUDIT,
    payload: audit,
  };
}

export const clearAudit = () => {
  return {
    type: CLEAR_AUDIT,
  };
}
