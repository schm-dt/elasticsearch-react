import React from 'react'
import { Report } from '../types'

export type ReportViewProps = Report

export const ReportView: React.FC<ReportViewProps> = ({ title, type }) => {
  return (
    <div>
      <h1>{title}</h1>
      <span>{type}</span>
    </div>
  )
}
