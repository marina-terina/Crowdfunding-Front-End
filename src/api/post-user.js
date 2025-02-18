async function postUser(username, email, password) {
    const url = `${import.meta.env.VITE_API_URL}/users/`;
    
    try {
        console.log('Sending signup request with:', {
            username: username,
            email: email,
            password: '***'
        });
        
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        });

        console.log('Response status:', response.status);
        
        const data = await response.json();
        console.log('Server response:', data);

        if (!response.ok) {
            console.log('Error data structure:', data);
            
            const errors = [];
            if (data.username) {
                errors.push(data.username[0]);
            }
            if (data.email) {
                errors.push(data.email[0]);
            }
            if (data.password) {
                errors.push(data.password[0]);
            }
            
            throw new Error(errors.join('\n'));
        }

        return data;
    } catch (error) {
        console.error('Full error object:', error);
        throw error;
    }
}

export default postUser; 