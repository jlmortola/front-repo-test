export type Post = {
  id: string
  title: string
  content?: string
  lat?: string | number // hot fix as backed return this as a string
  long?: string | number
  image_url?: string
  updated_at?: string
}

export type CreatePostRequest = {
  title: string
  content: string
  lat?: number
  long?: number
  image_url?: string
}

export type UpdatePostRequest = {
  id: string
  title: string
  content?: string
  lat?: number
  long?: number
  image_url?: string
}

export type DeletePostRequest = {
  id: string
}
