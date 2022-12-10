// client.js
import sanityClient from '@sanity/client'
import createImageUrlBuilder from "@sanity/image-url"

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PRODUCTION, // you can find this in sanity.json
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // or the name you chose in step 1
  apiVersion: '2021-10-21',
  useCdn: process.env.NODE_ENV === 'production', // `false` if you want to ensure fresh data
  token: process.env.SANITY_API_TOKEN,
}
export default sanityClient(config)


export const urlFor = (source) => createImageUrlBuilder(config).image(source)