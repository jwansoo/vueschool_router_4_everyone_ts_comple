export interface Destination{
  name:string
  slug:string
  image:string
  id:number
  desctiption:string
  experiences:Experiences
}

export type Experiences={
  name:string
  slug:string
  image:string
  description:string
}