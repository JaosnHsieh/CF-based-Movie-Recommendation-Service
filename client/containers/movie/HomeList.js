import React, { Component } from 'react'
import { toastr } from 'react-redux-toastr'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid, Header, Icon } from 'semantic-ui-react'
import RecommendBlock from '../../components/movie/RecommendBlock'
import RatedBlock from '../../components/movie/RatedBlock'
import { onRating } from '../../modules/movie'

export class HomeIndex extends Component {
  constructor (props, context) {
    super(props, context)
    this.handleRating = this.handleRating.bind(this)
  }

  async handleRating (e, data) {
    try {
      if (!this.props.isLogined) {
        toastr.info('想要評分請先登入哦！')
        return
      }
      toastr.confirm('確定要送出評分嗎？', {
        onOk: async () => {
          try {
            await this.props.onRating(data.movieid, data.rating)
            toastr.success('評分成功！')
          } catch (e) {
            toastr.error('評分失敗！')
          }
        }
      })
    } catch (e) {
      toastr.error(e.message)
    }
  }

  render () {
    const { ratingList, recommendList } = this.props.movie
    const recommendItems = recommendList.map((movie) => {
      return (
        <Grid.Column key={movie.id}>
          <RecommendBlock {...movie} onRate={this.handleRating} />
        </Grid.Column>
      )
    })
    const ratingItems = ratingList.map((rating) => {
      return (
        <Grid.Column key={rating.MovieId}>
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
  isLogined: state.source.isLogined
})

const mapDispatchToProps = bindActionCreators.bind(null, {
  onRating
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeIndex)
