export type Participant = {
  id: string
  type: string
  firstName: string
  lastName: string
  fullName: string
  streetAddress: string
}

export type Customer = {
  id: string
  type: string
  firstName: string
  lastName: string
  fullName: string
}

export type Report = {
  id: string
  type: string
  title: string
  content: string
}

export type SearchResult = {
  _index: string
  _type: string
  _id: string
  _source: Participant | Customer | Report
}
