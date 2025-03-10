export type Customer = {
  id: number
  name: string
  reference: string
  category: string
  start_date: string // If you need a Date object instead, you can change it to Date
  description?: string
  deleted_at?: string | null // Can be null or a string if the date is provided
  created_at?: string // Consider using Date if you want to convert this to a Date object
  updated_at?: string // Same here, you can convert it to Date if necessary
  contacts_count?: number
}

export type Contact = {
  id: number
  first_name: string
  last_name: string
  customer_id: number
  deleted_at?: string | null
  created_at?: string
  updated_at?: string
}
export interface ErrorList {
  [key: string]: string[]
}

export interface Errors {
  errorList: ErrorList
}

export type Customers = Customer[]
export type Contacts = Contact[]
