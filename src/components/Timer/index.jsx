import PropTypes from "prop-types"

function Timer ({ date, showcount = true, currDate = new Date()}) {
  const clockDate = new Date(date)
  const numWith2digitis = (num = 0) => num.toString().padStart(2, '0');
  let countYears = currDate.getFullYear() - clockDate.getFullYear()
  if (currDate.getMonth() < clockDate.getMonth() || (currDate.getMonth() === clockDate.getMonth() && currDate.getDate() < clockDate.getDate())) {
    countYears -= 1
  }
  return <>
    <span>{numWith2digitis(clockDate.getDate())}-{numWith2digitis(clockDate.getMonth() + 1)}-{clockDate.getFullYear()}</span> {showcount && <span> ({countYears} years ago)</span>}
    </>
}

Timer.propTypes = {
  date: PropTypes.string.isRequired
};

export default Timer
