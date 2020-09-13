import React from 'react'
import { Customer } from '../types'

export type CustomerViewProps = Customer

export const CustomerView: React.FC<CustomerViewProps> = ({ fullName, type }) => {
  return (
    <div>
      <h1>{fullName}</h1>
      <span>{type}</span>
    </div>
  )
}
