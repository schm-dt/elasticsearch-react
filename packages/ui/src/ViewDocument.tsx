import React from 'react'
import useFetch from 'use-http'
import { Result } from 'antd'
import { SearchResult } from './types'

export type ViewDocumentProps = { searchResult: SearchResult | null }

const ViewDocument: React.FC<ViewDocumentProps> = ({ searchResult }) => {
  const index = searchResult?._index
  const id = searchResult?._id

  if (!id) {
    return null
  }

  const { response, loading } = useFetch(`http://localhost:9000/${index}/${id}`, [id])

  console.log(response)
  const document = response?.data?._source

  if (!loading && !document) {
    return (
      <Result status="404" title="404" subTitle="Sorry, the page you visited does not exist." />
    )
  }

  if (!document) {
    return null
  }

  if ('title' in document) {
    return (
      <div>
        <h1>{document.title}</h1>
        <p>{document.content}</p>
      </div>
    )
  }

  return (
    <div>
      <h1>{document.fullName}</h1>
      <span>{document.type}</span>
      <p>{document.streetAddress}</p>
    </div>
  )
}

export default ViewDocument
