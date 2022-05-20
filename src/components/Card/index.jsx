import './index.scss'
import PropTypes from "prop-types"

function Card ({ instance:ContentInstance, content } = {}) {

  return (
    <div className="card">
      <ContentInstance content={content}></ContentInstance>
    </div>
  )

}


Card.propTypes = {
  instance: PropTypes.func.isRequired,
  content: PropTypes.object.isRequired
};


export default Card
