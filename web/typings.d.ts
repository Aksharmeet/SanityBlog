export interface Post  {
    _id: string,
    title: string,
    slug: string,
    author: object,
    description: string,
    mainImage:{_type:string, asset: {_ref:string, _type:string}},
    categories: [string] 
    _createdAt: string,
  }
