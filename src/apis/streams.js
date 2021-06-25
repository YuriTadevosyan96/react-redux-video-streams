import axios from 'axios';

const streamsApi = axios.create({ baseURL: 'http://localhost:3001/streams/' });

export default streamsApi;
