import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    teamMatchesData: {},
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamMatches = async () => {
    const {id} = this.props.match.params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatch: this.getFormattedData(data.latest_match_details),
      recentMatches: data.recent_matches.map(each =>
        this.getFormattedData(each),
      ),
    }

    this.setState({teamMatchesData: updatedData, isLoading: false})
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderTeamDetails = () => {
    const {teamMatchesData} = this.state
    const {teamBannerUrl, latestMatch, recentMatches} = teamMatchesData

    return (
      <div className="responsive-container">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <LatestMatch latestMatch={latestMatch} />
        <ul className="recent-matches-list">
          {recentMatches.map(each => (
            <MatchCard key={each.id} matchDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="team-matches-container">
        {isLoading ? this.renderLoader() : this.renderTeamDetails()}
      </div>
    )
  }
}

export default TeamMatches
