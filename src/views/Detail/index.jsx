import React from "react"
import {useNavigate, useParams} from "react-router"
import { useEffect, useState } from "react"
import { getDetail } from "../../services"
import Card from '../../components/Card'
import './index.scss'
import Timer from "../../components/Timer"
import Button from "../../components/Button";

function Detail() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(undefined)
  const [detail, setDetail] = useState(undefined)
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setError(undefined)
        const detail = await getDetail({id})
        setDetail(detail)
      } catch (e) {
        console.error(e)
        setError('Imposible obtain data')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [id])

  const CardContent = ({ content: { director, producer, release_date } }) => {
    return <>
      <div className="director">Director: {director}</div>
      <div className="producer">Producer: {producer.split(',').map((produce, index) => <React.Fragment key={index}>{produce}<br/></React.Fragment>)}</div>
      <div className="release_date">Release date: <Timer showcount={false} date={release_date}/></div>
    </>
  }

  return (
    <div className="details">
      <Button click={() => navigate(-1)} withstyles={false} text="Back to results" icon="arrow left"></Button>
      {error && <div>{error}</div>}
      {loading && <div>Loading id {id}</div>}
      {!loading && !error &&
        <div className="details">
          <div className="header"><span className="title">{detail.title}</span> <span className="subtitle">Episode {detail.episode_id}</span></div>
          <Card instance={CardContent} content={detail}></Card>
        </div>
      }
    </div>
  )
}

export default Detail
