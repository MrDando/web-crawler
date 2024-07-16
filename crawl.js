import { JSDOM } from 'jsdom'

export async function crawlPage(baseURL, currentURL, pages = {}) {

    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    if (baseURLObj.hostname != currentURLObj.hostname) {
        return pages
    }

    const normalizedURL = normalizeURL(currentURL)

    if (pages[normalizedURL] > 0) {
        pages[normalizedURL] ++
        return pages
    }

    pages[normalizedURL] = 1

    console.log(`Crawling page ${currentURL}`)

    try {
        const response = await fetch(currentURL, {
            method: "GET",
        })

        if (!response.ok) {
            console.warn(`Fetch error, status code: ${response.status} on page: ${currentURL}`)
            return pages
        }

        const contentType = response.headers.get("content-type")

        if (!contentType.includes('text/html')) {
            console.log(`Non HTML reponse on page ${currentURL}, content type: ${contentType}`)
            return pages
        }
        
        const htmlBody = await response.text()

        const nextURLs = getURLsFromHTML(htmlBody, baseURL)

        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages)
        }
        return pages

    } catch (error) {
        console.error(`Error in crawlPage function: ${error.message}`)
    }
    
}

export function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0,1) === '/') {
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (error) {
                console.warn(`Error with relative url: ${error.message}`)
            }
            
        } else {
            try {
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            } catch (error) {
                console.warn(`Error with absolute url: ${error.message}`)
            }
            
        } 
    }
    return urls
}

export function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }

    return hostPath
}