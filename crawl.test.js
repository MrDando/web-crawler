import { test, expect } from "@jest/globals";

import { normalizeURL } from "./crawl.js";

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