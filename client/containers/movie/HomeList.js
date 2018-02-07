import React, { Component } from 'react'
// import { toastr } from 'react-redux-toastr'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Grid, Header, Icon } from 'semantic-ui-react'
import RecommendBlock from '../../components/movie/RecommendBlock'
import RatedBlock from '../../components/movie/RatedBlock'
import Pagination from '../../components/movie/Pagination'

export class HomeIndex extends Component {

  constructor (props, context) {
    super(props, context)
  }

  render () {
    const { ratingList, recommendList } = this.props.movie;
    const recommendItems = recommendList.map((movie) => {
      return(
        <Grid.Column key={movie.id}>
          <RecommendBlock {...movie} />
        </Grid.Column>
      )
    })
    const ratingItems = ratingList.map((rating) => {
      return(
        <Grid.Column key={rating.MemberId}>
          <RatedBlock {...rating} />
        </Grid.Column>
      )
    })

    return (
      <div>
        {this.props.isLogined && <div>
          <Header as='h3' dividing>
            <Icon name='pocket' />
            <Header.Content>
              Rating Pocket
            </Header.Content>
          </Header>
          <Grid padded columns={4} doubling>
            { ratingItems }

            {ratingList.length === 0 && <Grid.Row>
              您還沒對電影評分 ......
            </Grid.Row>}
          </Grid>
        </div>}
        {recommendList.length > 0 && <div>
          <Header as='h3' dividing>
            <Icon name='thumbs outline up' />
            <Header.Content>
              Maybe you will like ......
            </Header.Content>
          </Header>
          <Grid padded columns={3} doubling>
            { recommendItems }
          </Grid>
        </div>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  movie: state.movie,
  isLogined: state.source.isLogined,
})

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(, dispatch)
// }
// export default connect(mapStateToProps, mapDispatchToProps)(HomeIndex)
export default connect(mapStateToProps)(HomeIndex)
