import React, {useState} from 'react';

export function useBaseUrl() {
    let url = "";
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        url = "http://localhost:8080";
    } else {
        url = "https://airj18.skqist225.xyz";
    }
    const [baseUrl, setBaseUrl] = useState(url);
    return [
        baseUrl,
        setBaseUrl
    ]
}