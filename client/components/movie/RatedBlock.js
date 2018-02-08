import React from 'react'
import PropTypes from 'prop-types'
import { Rating, Segment } from 'semantic-ui-react'

const RatedBlcok = ({ rating, Movie }) => (
  <Segment>
    <h4>{ Movie.title }</h4>
    <Rating icon='star' defaultRating={rating} maxRating={5} disabled />
  </Segment>
)

RatedBlcok.propTypes = {
  rating: PropTypes.number,
  Movie: PropTypes.object
}

export default RatedBlcok
