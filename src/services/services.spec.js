import axios from "axios"
import * as list from './fake/oneelementlist.json'
import * as tatooine from './fake/tatooine.json'
import * as luke from './fake/luke.json'
import * as film from './fake/film.json'

import {getAll, getData, getDetail} from './'
import { BASE_URL } from "../env"

jest.mock('axios')

describe('getAll', () => {
  const response = (url) => {
    console.info('url', url)
    switch (url) {
      case 'https://swapi.dev/api/films':
        return Promise.resolve({ data: list })
      case 'https://swapi.dev/api/planets/1/':
        return Promise.resolve({ data: tatooine })
      case 'https://swapi.dev/api/people/1/':
        return Promise.resolve({ data: luke })
      case 'https://swapi.dev/api/films/1':
        return Promise.resolve({ data: film })
      default:
        return Promise.reject(new Error('not found'))
    }
  }
  it('fetches succesfully url', async () => {
    axios.get.mockResolvedValueOnce({ data: list })
    await getData(`${BASE_URL}/films`)
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/films`)
  })
  it('fetches successfully films from API and return filter elements with 0 elements not pass the AND rule', async () => {
    //give
    axios.get.mockImplementation(response)
    // when
    const totalResponse = await getAll({ filter: ['luke', 'tatoine']})
    expect(totalResponse).toEqual([])
  })
  it('fetches successfully films from API and return filter elements with 1 element passing the AND rule', async () => {
    //give
    axios.get.mockImplementation(response)
    // when
    const word2search = "LuKe"
    const totalResponse = await getAll({ filter: [word2search]})
    expect(totalResponse.length).toBe(1)
    expect(totalResponse[0].characters[0].name.toLowerCase().indexOf(word2search.toLowerCase())).toBeGreaterThanOrEqual(0)
  })
  it('fetches successfully film detail from API and return correct item', async () => {
    //give
    axios.get.mockImplementation(response)
    // when
    const totalResponse = await getDetail({ id: 1 })
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/films/1`)
    expect(totalResponse).toBe(film)
  })
})
