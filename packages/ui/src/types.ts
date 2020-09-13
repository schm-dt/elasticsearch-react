export type Participant = {
  id: string
  type: 'participant'
  firstName: string
  lastName: string
  fullName: string
  streetAddress: string
  avatar: string
}

export type Customer = {
  id: string
  type: 'customer'
  firstName: string
  lastName: string
  fullName: string
}

export type Report = {
  id: string
  type: 'report'
  title: string
  content: string
}

export type SearchResult = {
  _index: string
  _type: string
  _id: string
  _source: Participant | Customer | Report
}
