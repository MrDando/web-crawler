import { argv } from 'node:process';

import { crawlPage } from './crawl.js'
import { printReport } from './report.js'

async function main() {
    console.log('--------------------------------------------------------------')
    console.log('Starting web crawler')

    if (argv.length < 3) {
        console.error("Please provide URL")
        return
    } else if (argv.length > 3) {
        console.error("Program expects only one CLI argmunet")
        return
    }

    const baseURL = argv[2]
    console.log(`Starting web-crawler with URL: ${baseURL}`)

    const pages = await crawlPage(baseURL, baseURL, {})

    printReport(pages)
  }
  
  main()