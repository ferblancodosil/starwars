import {useEffect, useState} from "react"
import "./index.scss"
import Searcher from "../../components/Searcher"
import Button from "../../components/Button"
import { getAll } from "../../services"
import Timer from "../../components/Timer"
import Card from "../../components/Card"
import { Link, useSearchParams} from "react-router-dom"
import { PATH_DETAILS } from "../../env"

function Home() {
  let [searchParams] = useSearchParams()
  const [searcherValue, setSearcherValue] = useState('')
  const [filter, setFilter] = useState(undefined)
  const [films, setFilms] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        if (filter !== undefined) {
          setLoading(true)
          const array2filter = filter.split(' ').filter(Boolean)
          const films = await getAll({filter: array2filter})
          setFilms(films)
        }
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [filter])

  useEffect(() => {
    console.info('searchParams.get(\'query\')', searchParams.get('query'))
    if (searchParams.get('query') !== null) {
      setFilter(searchParams.get('query'))
      setSearcherValue(searchParams.get('query'))
    }
  }, [searchParams])

  const CardContent = ({ content: { title, director, episode_id, release_date, film_id } }) => {
    return <Link to={PATH_DETAILS.replace(":id", film_id)} className="pointer content">
      <div className="title">{title}</div>
      <div className="director">Director: {director}</div>
      <div className="episode">Episode {episode_id}</div>
      <div className="release_date"><Timer date={release_date}/></div>
    </Link>
  }
  return (
    <div className="home">
      <form action='/' className={filter === undefined ? 'middle-page' : ''}>
        <div className="title">Search films by titles, characters or planets</div>
        <div className="searcher">
          <Searcher name="query" value={searcherValue} onChange={({ text }) => setSearcherValue(text)}></Searcher>
          <Button text="Go" disabled={loading}></Button>
        </div>
      </form>
      {loading ?
        <div>Loading data</div> :
        <div className="films">
          {films.map((film, index) => <Card key={index} instance={CardContent} content={film}></Card>)}
        </div>}
    </div>
  );
}

export default Home;
