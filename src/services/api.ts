import axios from 'axios'

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL
})

export const fetcher = url => axios.get(url).then(res => res.data)