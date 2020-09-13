import * as React from 'react'
import { Input, AutoComplete } from 'antd'
// import { UserOutlined } from "@ant-design/icons";
import useFetch from 'use-http'
import 'antd/dist/antd.css'
import { SearchResult } from './types'
import ViewDocument from './ViewDocument'

const ENDPOINT = 'http://localhost:9000'

const getValue = (item: SearchResult['_source']) => {
  // Report
  if ('title' in item) {
    return item.title
  }

  // Participant/Customer
  return item.fullName
}

const renderResult = (item: SearchResult['_source']) => {
  if ('streetAddress' in item) {
    return (
      <div>
        <div>
          {item.fullName} ({item.id})
        </div>
        <span>{item.streetAddress}</span>
      </div>
    )
  }

  // Report
  if ('title' in item) {
    return (
      <div>
        <div>{getValue(item)}</div>
        <span>{item.content}</span>
        <span>Report</span>
      </div>
    )
  }

  return (
    <div>
      <div>
        {item.fullName} ({item.id})
      </div>
      <div>{getValue(item)}</div>
    </div>
  )
}

const searchResultAsOption = (result: SearchResult) => ({
  key: result._source.id,
  result,
  value: getValue(result._source),
  label: renderResult(result._source),
})

export default () => {
  const [selected, setSelected] = React.useState<SearchResult | null>(null)
  const [value, setValue] = React.useState<string>('')
  const { response, loading, error } = useFetch(`${ENDPOINT}/search/?q=${value}`, [value])

  console.log(response, loading, error)

  const onChange = React.useCallback(
    e => {
      setValue(e.target.value)
    },
    [setValue],
  )

  const onSelect = React.useCallback(
    (value, option) => {
      setSelected(option.result)
      setValue(value)
    },
    [setValue],
  )

  const onSubmit = React.useCallback(e => {
    console.log(value)
    e.preventDefault()
  }, [])

  const options = response?.data?.hits?.hits.map(searchResultAsOption)

  return (
    <div style={{ padding: 50 }}>
      <form onSubmit={onSubmit}>
        <AutoComplete
          dropdownMatchSelectWidth={500}
          style={{ width: 500 }}
          options={options}
          onChange={setValue}
          onSelect={onSelect}
        >
          <Input.Search
            size="large"
            placeholder="Search for anything"
            value={value}
            onChange={onChange}
          />
        </AutoComplete>
      </form>
      <ViewDocument searchResult={selected} />
    </div>
  )
}
