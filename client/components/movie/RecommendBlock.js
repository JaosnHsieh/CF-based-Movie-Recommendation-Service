import React from 'react'
import { Rating, Segment } from 'semantic-ui-react'
const RecommendBlock = ({id, people, rating = 0, genres, title, disabled = true, onRate}) => (
  <Segment color='orange'>
    <h3>{ title }</h3>
    <Rating icon='star' defaultRating={0} onRate={onRate} maxRating={5} disabled={false} movieid={id} />
    / Avg { Number(rating).toFixed(2) } ({ people } People)
  </Segment>
)
export default RecommendBlock
