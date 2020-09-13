import React from 'react'
import { Avatar } from 'antd'
import { Input, AutoComplete } from 'antd'
import useFetch from 'use-http'
import { useDebounce } from 'react-use'
import { SearchResult } from '../types'

const ENDPOINT = 'http://localhost:9000'

const getValue = (item: SearchResult['_source']) => {
  if (item.type === 'report') {
    return item.title
  }

  return item.fullName
}

const renderResult = (item: SearchResult['_source']) => {
  if (item.type === 'participant') {
    return (
      <div>
        {item.avatar && <Avatar src={item.avatar} />}
        <div>
          {item.fullName} ({item.id})
        </div>
        <span>{item.streetAddress}</span>
      </div>
    )
  }

  if (item.type === 'report') {
    return (
      <div>
        <div>{getValue(item)}</div>
        <span>{item.content}</span>
        <span>Report</span>
      </div>
    )
  }

  if (item.type === 'customer') {
    return (
      <div>
        <div>
          {item.fullName} ({item.id})
        </div>
        <div>{getValue(item)}</div>
      </div>
    )
  }

  throw Error('Invalid item')
}

const searchResultAsOption = (result: SearchResult) => ({
  key: result._source.id,
  result,
  value: getValue(result._source),
  label: renderResult(result._source),
})

export type SearchFormProps = {
  onSelected: (selected: SearchResult | null) => void
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSelected }) => {
  const [selected, setSelected] = React.useState<SearchResult | null>(null)
  const [value, setValue] = React.useState<string>('')
  const [debouncedValue, setDebouncedValue] = React.useState<string>('')

  const onSelect = React.useCallback(
    (value, option) => {
      setSelected(option.result)
      setValue(value)
    },
    [setValue],
  )

  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue(value)
    },
    500,
    [value],
  )

  const onSubmit = React.useCallback(e => {
    console.log(e)
    cancel()
    e.preventDefault()
  }, [])

  const { response } = useFetch(`${ENDPOINT}/search/?q=${debouncedValue}`, [debouncedValue])

  const options = response?.data?.hits?.hits.map(searchResultAsOption)

  React.useEffect(() => {
    onSelected(selected)
  }, [selected])

  return (
    <form onSubmit={onSubmit}>
      <AutoComplete
        style={{ width: 500 }}
        options={options}
        onChange={setValue}
        onSelect={onSelect}
        value={value}
      >
        <Input.Search size="large" placeholder="Search for anything" />
      </AutoComplete>
    </form>
  )
}
