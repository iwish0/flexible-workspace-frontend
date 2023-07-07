
import axios, { AxiosInstance } from 'axios';
const BEARER: string = 'Bearer';
export const axiosInstance = (token: string): AxiosInstance => axios.create({ headers: { 'authorization': `${BEARER} ${token}` } });