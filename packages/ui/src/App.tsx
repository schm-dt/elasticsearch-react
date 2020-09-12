import * as React from "react";
import { Input, AutoComplete } from "antd";
// import { UserOutlined } from "@ant-design/icons";
import useFetch from "use-http";
import "antd/dist/antd.css";

import "./App.css";

type Participant = {
  id: string;
  type: string;
  firstName: string;
  lastName: string;
  fullName: string;
  streetAddress: string;
};

type Customer = {
  id: string;
  type: string;
  firstName: string;
  lastName: string;
  fullName: string;
};

type Report = {
  id: string;
  type: string;
  title: string;
  content: string;
};

type SearchResult = { _source: Participant | Customer | Report };

const getLabel = (item: SearchResult["_source"]) => {
  if ("streetAddress" in item) {
    return item.streetAddress;
  }

  if ("title" in item) {
    return item.title;
  }

  return item.fullName;
};

const renderItem = (result: SearchResult) => {
  return {
    key: result._source.id,
    value: getLabel(result._source),
    label: <span>{getLabel(result._source)}</span>
  };
};

export default () => {
  const [query, setQuery] = React.useState<string>("");
  const {
    response
    // loading,
    // error
  } = useFetch(`http://localhost:9000/search/?q=${query}`, [query]);

  const onChange = React.useCallback(
    e => {
      setQuery(e.target.value);
    },
    [setQuery]
  );

  const onSelect = React.useCallback(
    v => {
      setQuery(v);
    },
    [setQuery]
  );

  // @ts-ignore
  const options = response?.data?.hits?.hits.map(renderItem) ?? [];

  return (
    <div className="App" style={{ padding: 50 }}>
      <div>
        <AutoComplete
          dropdownMatchSelectWidth={500}
          style={{ width: 500 }}
          options={options}
          onSelect={onSelect}
        >
          <Input.Search
            size="large"
            placeholder="input here"
            value={query}
            onChange={onChange}
          />
        </AutoComplete>
      </div>
    </div>
  );
};
