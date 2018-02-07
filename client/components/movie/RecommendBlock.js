import React from 'react'
import { Rating, Segment } from 'semantic-ui-react'
const RecommendBlock = ({id, score, genres, title, disabled = true }) => (
  <Segment color='orange'>
    <h3>{ title }</h3>
    Avg <Rating icon='star' defaultRating={3}  maxRating={5} disabled />
    / <Rating icon='star' defaultRating={0} onRate={()=>{}} maxRating={5} disabled={false}/>
    <div>{ genres }</div>
  </Segment>
)
export default RecommendBlock
