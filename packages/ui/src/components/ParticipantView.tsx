import React from 'react'
import { Avatar } from 'antd'
import { Participant } from '../types'

export type ParticipantViewProps = Participant

export const ParticipantView: React.FC<ParticipantViewProps> = ({
  fullName,
  avatar,
  streetAddress,
  type,
}) => {
  return (
    <div>
      {avatar && <Avatar src={avatar} />}
      <p>{streetAddress}</p>
      <h1>{fullName}</h1>
      <span>{type}</span>
    </div>
  )
}
