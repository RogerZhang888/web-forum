export default function callChiBackend(url, options = {}) {
        const accessToken = session?.access_token;
        accessToken
        const headers = {
            ...options.headers,
            'Authorization': accessToken,
        };

        const response = await fetch(url, { ...options, headers });

        if (response.status === 401) {
            console.error("Session expired or unauthorized.")
        }

        return response
    }