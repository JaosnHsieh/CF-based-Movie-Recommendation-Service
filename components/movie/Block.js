import React from 'react'
import { Label, Segment } from 'semantic-ui-react'
const Block = ({ date, id, score, tags, title }) => (
  <Segment color='orange'>
    <h3>{ title }</h3>
    <div>Rank: { score }</div>
    <div>Released Year: { new Date(date).getFullYear() }</div>
    <div>Type: { tags.join(',') }</div>
  </Segment>
)
export default Block
