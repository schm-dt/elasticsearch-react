import * as React from 'react'
import 'antd/dist/antd.css'
import { ViewDocument, SearchForm, SearchFormProps } from './components'

export default () => {
  const [selected, setSelected] = React.useState<Parameters<SearchFormProps['onSelected']>[0]>(null)

  return (
    <div style={{ padding: 50 }}>
      <SearchForm onSelected={setSelected} />
      <ViewDocument searchResult={selected} />
    </div>
  )
}
