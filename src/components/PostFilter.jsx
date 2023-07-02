import React from 'react'
import MyInput from './UI/input/MyInput'
import MySelect from './UI/select/MySelect'

export default function PostFilter({filter, setFilter}) {

  return (
    <div>
      <MyInput
        type="text"
        placeholder='search...'
        value={filter.query}
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
      />
      <MySelect
        value={filter.sort}
        onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
        defaultValue='sort by...'
        options={[
          { value: 'title', name: 'By Name'},
          { value: 'body', name: 'By Description'},
        ]}
      />
    </div>
  )
}
