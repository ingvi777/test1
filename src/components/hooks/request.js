import React, { useState, useEffect } from "react";

export function useFetch(uri) {
    const [state, setData] = useState([]);
    const [error, setError] = useState([]);
    useEffect(() => {
        //if (!uri) return;
        fetch(uri)
            .then(state => state.json())
            .then(setData)
            .catch(setError);
    }, [uri]);
    return {
        state,
        error
    };
}