import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData(){
  // get file name under .... /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map( file_name => {

    // remove ".md" from file name to get ID
    const id = file_name.replace(/\.md$/, '')

    // read markdown file as string
    const fullPath = path.join(postsDirectory, file_name)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // use gray-matter --- to parse post meta data 
    const matterResult = matter(fileContents)

    // combine data
    return {
      id,
      ...matterResult.data
    }


  })


  // SORT POST by Date
  return allPostsData.sort(({ date : a }, {date : b}) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })



}