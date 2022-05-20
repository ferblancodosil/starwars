import axios from "axios"
import { BASE_URL } from '../env'

export const getDetail = async ({ id, concept = 'films' } = {}) => {
  if (id === undefined) throw new Error("Not defined id")
  if (!getDetail._cache) getDetail._cache = {}
  if (!getDetail._cache[id]) {
    try {
      const { data } = await axios.get(`${BASE_URL}/${concept}/${id}`)
      getDetail._cache[id] = data
    } catch (e) {
      console.error('Imposible get data', e)
      throw new Error('Imposible get data')
    }
  }
  return getDetail._cache[id]
}
