import { JSDOM } from 'jsdom'

export async function crawlPage(url) {
    try {
        const response = await fetch(url, {
            method: "GET",
        })

        if (!response.ok) {
            console.warn(`Fetch error, status code: ${response.status} on page: ${url}`)
            return
        }

        const contentType = response.headers.get("content-type")

        if (!contentType.includes('text/html')) {
            console.log(`Non HTML reponse on page ${url}, content type: ${contentType}`)
            return
        }
        console.log(await response.text())
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