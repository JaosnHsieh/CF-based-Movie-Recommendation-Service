import React from 'react'
import { Label, Rating, Segment } from 'semantic-ui-react'
const Block = ({ date, id, score, genres, title }) => (
  <Segment color='orange'>
    <h3>{ title }</h3>
    <Rating icon='star' defaultRating={3} maxRating={5} disabled />
    <div>{ genres }</div>
  </Segment>
)
export default Block
