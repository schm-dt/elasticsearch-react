import React from 'react'
import useFetch from 'use-http'
import { Result } from 'antd'
import { SearchResult } from '../types'
import { CustomerView, ParticipantView, ReportView } from './'

export type ViewDocumentProps = { searchResult: SearchResult | null }

export const ViewDocument: React.FC<ViewDocumentProps> = ({ searchResult }) => {
  const index = searchResult?._index
  const id = searchResult?._id

  if (!id) {
    return null
  }

  const { response, loading } = useFetch(`http://localhost:9000/${index}/${id}`, [id])

  const document = response?.data?._source as SearchResult['_source']

  if (!loading && !document) {
    return (
      <Result status="404" title="404" subTitle="Sorry, the page you visited does not exist." />
    )
  }

  if (!document) {
    return null
  }

  if (document.type === 'report') {
    return <ReportView {...document} />
  }

  if (document.type === 'customer') {
    return <CustomerView {...document} />
  }

  if (document.type === 'participant') {
    return <ParticipantView {...document} />
  }

  return null
}
