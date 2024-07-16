import { JSDOM } from 'jsdom'

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