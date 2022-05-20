import axios from "axios"
import { BASE_URL } from '../env'
import { _data } from "./fake"

const getData = async (url) => {
  if (url === undefined) throw new Error("Not defined url")
  // It is necessary have fake data because the api is veeeeery slow :(
  if (_data[url]) return _data[url]
  if (!getData._cache) getData._cache = {}
  if (!getData._promises) getData._promises = {}
  if (!getData._promises[url]) {
    console.info('request', url)
    getData._promises[url] = axios.get(url)
  }
  if (!getData._cache[url]) {
    const { data } = await getData._promises[url]
    getData._cache[url] = data
  }
  return getData._cache[url]
}

export const getAll = async ({ filter = [], elements = 'films' } = {}) => {
    try {
      const { results } = await getData(`${BASE_URL}/${elements}`)
      if (!getAll._cache) {
        const data = []
        for (const item of results) {
          // It is necessary to wait because the api does not support so many calls in parallel :(
          const characters = await Promise.all((item.characters || []).map(character => getData(character)))
          const planets = await Promise.all((item.planets || []).map(planet => getData(planet)))
          const _searcher = `${item.title.toLowerCase()},${characters.map(c => c.name.toLowerCase()).join()},${planets.map(p => p.name.toLowerCase()).join()}`
          const film_id = Number(item.url.replaceAll(new RegExp(".*\\/([0-9]+)\\/$", "gi"), "$1"))
          data.push({...item, _searcher, characters, planets, film_id})
        }
        getAll._cache = Object.assign([], data)
      }
      const regExp = new RegExp(filter.map(item => `(?=.*${item})`).join(""), "gi")
      return !filter.length ? getAll._cache : getAll._cache.filter(item => !!item._searcher.match(regExp))

    } catch (e) {
      console.error('Imposible get data', e)
      throw new Error('Imposible get data')
    }
}

export const getDetail = async ({ id, elements = 'films' } = {}) => {
  if (id === undefined) throw new Error("Not defined id")
  try {
    return await getData(`${BASE_URL}/${elements}/${id}`)
  } catch (e) {
    console.error('Imposible get data', e)
    throw new Error('Imposible get data')
  }
}
