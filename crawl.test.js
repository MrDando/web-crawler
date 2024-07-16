import { test, expect } from "@jest/globals";

import { normalizeURL, getURLsFromHTML } from "./crawl.js";

test('normalizeURL strip protocol', () => {
    const input = 'https://www.youtube.com/feed/history'
    const actual = normalizeURL(input)
    const expected = 'www.youtube.com/feed/history'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', () => {
    const input = 'https://www.youtube.com/feed/history/'
    const actual = normalizeURL(input)
    const expected = 'www.youtube.com/feed/history'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip protocol and query', () => {
    const input = 'https://www.google.com/search?q=test'
    const actual = normalizeURL(input)
    const expected = 'www.google.com/search'
    expect(actual).toEqual(expected)
})

test('normalizeURL make all chars lowercase', () => {
    const input = 'https://www.Google.com/search?q=test'
    const actual = normalizeURL(input)
    const expected = 'www.google.com/search'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http protocol', () => {
    const input = 'http://www.youtube.com/feed/history'
    const actual = normalizeURL(input)
    const expected = 'www.youtube.com/feed/history'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute URLs', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.boot.dev/path">
            Boot.deb Blog
        </a>
    </body>
</html>
    `
    const inputBaseURL = 'https://blog.boot.dev/path'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative URLs', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="/path/">
            Boot.deb Blog Path
        </a>
    </body>
</html>
    `
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute and relative URLs', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.boot.dev">
            Boot.deb Blog
        </a>
        <a href="/path/">
            Boot.deb Blog Path
        </a>
    </body>
</html>
    `
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/", "https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid URL', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.boot.dev">
            Boot.deb Blog
        </a>
        <a href="/path/">
            Boot.deb Blog Path
        </a>
        <a href="invalid">
            Bad URL
        </a>
    </body>
</html>
    `
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/", "https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})