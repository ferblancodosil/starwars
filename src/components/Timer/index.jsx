import PropTypes from "prop-types"

function Timer ({ date, showcount = true, currDate = new Date()}) {
  const clockDate = new Date(date)
  let countYears = currDate.getFullYear() - clockDate.getFullYear()
  if (currDate.getMonth() < clockDate.getMonth() || (currDate.getMonth() === clockDate.getMonth() && currDate.getDate() < clockDate.getDate())) {
    countYears -= 1
  }
  return <>
    <span>{clockDate.getDate()}-{clockDate.getMonth() + 1}-{clockDate.getFullYear()}</span> {showcount && <span> ({countYears} years ago)</span>}
    </>
}

Timer.propTypes = {
  date: PropTypes.string.isRequired
};

export default Timer
