import React, { Component } from 'react'
// import { toastr } from 'react-redux-toastr'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid } from 'semantic-ui-react'
import Block from '../../components/movie/Block'

export class HomeIndex extends Component {

  constructor (props, context) {
    super(props, context)
  }

  render () {
    const list = this.props.movie && this.props.movie.list || [];
    const items = list.map((movie) => {
      return(
        <Grid.Column key={movie.id}>
          <Block {...movie} />
        </Grid.Column>
      )
    })

    return (
      <Grid columns={5} doubling>
        { items }
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  movie: state.movie,
})

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(, dispatch)
// }
// export default connect(mapStateToProps, mapDispatchToProps)(HomeIndex)
export default connect(mapStateToProps)(HomeIndex)
