import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.kanban.moeda.today',
})
