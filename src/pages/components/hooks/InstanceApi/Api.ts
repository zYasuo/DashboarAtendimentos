import axios from 'axios';

// instância do axios com configurações padrão
export const api = axios.create({
    baseURL: '/api',
});


