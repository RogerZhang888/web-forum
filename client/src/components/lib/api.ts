// This function sends authenticated requests to the Chi backend. 
// It is not a React component. 

import supabase from "./supabase";

interface CallChiBackendOptions extends RequestInit {
    headers?: Record<string, string>;
} 

async function callChiBackend(url: string, options: CallChiBackendOptions = {}): Promise<Response> {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;
        if (!token) {
            throw new Error ("No authentication token found");
        }

        const headers = {
            "Content Type": "application/json",
            ...options.headers,
            "Authorization": `Bearer ${token}`,
        }

        const response = await fetch(url, {
            ...options,
            headers
        })

        if (response.status === 401) {
            console.error("Session expired or unauthorized");
        } 

        if (!response.ok) {
            throw new Error(`HTTP error, status: ${response.status}`);
        }

        return response;

    } catch (error) {
        console.error("Error calling Chi backend:", error);
        throw error;
    }    

}

export default callChiBackend;