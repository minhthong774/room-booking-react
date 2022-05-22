import React, {useState} from 'react';
export function useBaseUrl(){
    const [baseUrl, setBaseUrl] = useState("http://localhost:8080");
    return [
        baseUrl,
        setBaseUrl
    ]   
}