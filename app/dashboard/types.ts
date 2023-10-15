export type Post = {
  id: string
  title: string
  content: string
  lat: string
  long: string,
  image_url: string
  updated_at: string
}

export type CreatePostRequest = {
  title: string
  content: string
  lat?: string
  long?: string,
  image_url?: string
  updated_at?: string
}

export type UpdatePostRequest = {
  id: string
  title?: string
  content?: string
  lat?: string
  long?: string,
  image_url?: string
  updated_at?: string
}

export type DeletePostRequest = {
  id: string
}
