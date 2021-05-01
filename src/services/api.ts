import axios from 'axios'

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL
})

export async function fetcher(url) {
    const res = await api.get(url)
    return res
}