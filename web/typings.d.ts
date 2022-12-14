export interface Post  {
    _id: string,
    title: string,
    slug: {
      _type: string,
      current: string
    },
    author: object,
    description: string,
    mainImage:{_type:string, asset: {_ref:string, _type:string}},
    categories: [string] 
    _createdAt: string,
  }

  export interface SinglePost {
    _id: string,
    title: string,
    slug: {
      _type: string,
      current: string
    },
    author: object,
    description: string,
    mainImage:{_type:string, asset: {_ref:string, _type:string}},
    categories: [string] 
    _createdAt: string,
    body: Array
  }