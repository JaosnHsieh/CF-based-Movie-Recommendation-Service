import React from 'react'
import { Label, Rating, Segment } from 'semantic-ui-react'
const RatedBlcok = ({ MovieId, rating, Movie }) => (
  <Segment>
    <h4>{ Movie.title }</h4>
    <Rating icon='star' defaultRating={rating} maxRating={5} disabled />
  </Segment>
)
export default RatedBlcok
