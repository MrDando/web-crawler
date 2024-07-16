import { normalizeURL } from './crawl.js'
import { argv } from 'node:process';

function main() {
    console.log('--------------------------------------------------------------')
    console.log('Starting web crawler')

    if (argv.length < 3) {
        console.error("Please provide URL")
        return
    } else if (argv.length > 3) {
        console.error("Program expects only one CLI argmunet")
        return
    }

    const url = argv[2]
    console.log(`Starting web-crawler with URL: ${url}`)

  }
  
  main()
  console.log('--------------------------------------------------------------')



// print process.argv
// argv.forEach((val, index) => {
//     console.log(`${index}: ${val}`);
//   });