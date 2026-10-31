import './index.css'

const LatestMatch = props => {
  const {latestMatch} = props
  const {
    competingTeam,
    date,
    venue,
    result,
    competingTeamLogo,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = latestMatch

  return (
    <div className="latest-match-container">
      <p className="latest-match-heading">Latest Matches</p>

      <div className="latest-match-card">
        <div>
          <p>{competingTeam}</p>
          <p>{date}</p>
          <p>{venue}</p>
          <p>{result}</p>
        </div>

        <img
          src={competingTeamLogo}
          alt={`latest match ${competingTeam}`}
          className="latest-match-team-logo"
        />

        <div>
          <p>{firstInnings}</p>
          <p>{secondInnings}</p>
          <p>{manOfTheMatch}</p>
          <p>{umpires}</p>
        </div>
      </div>
    </div>
  )
}

export default LatestMatch
