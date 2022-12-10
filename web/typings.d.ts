// typings.d.ts

export interface Post {
    _id:string;
    _createdAt: string;
    title:string;
    slug:{
      current: string
    };
    author:  {
      name:string;
      image:string;
    },
    description:string;
    mainImage:  {
      asset: {
        url:string;
      };
    };
    slug:string;
    body: [object];
  
}