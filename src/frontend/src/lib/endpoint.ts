const BASE_URL = import.meta.env.VITE_BASE_URL;
export const INTIATE_DKG_ENDPOINT = `${BASE_URL}/roundOne`;
export const ADD_MESSAGES_ENDPOINT = `${BASE_URL}/roundOne/addMessages`;
export const INTIATE_ROUND_TWO_ENDPOINT = `${BASE_URL}/roundTwo/initiate`;
export const ADD_SHARES_ENDPOINT = `${BASE_URL}/roundTwo/addShares`;
export const END_ROUND_TWO_ENDPOINT = `${BASE_URL}/roundTwo/end`;
export const RECONSTRUCT_SECRET_ENDPOINT = `${BASE_URL}/reconstruct`;