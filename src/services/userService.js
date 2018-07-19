
export const userService = {
    login,
    logout,
    register,
    sendResetPasswordLink,
    resetPassword,
    createPilotProfile,
    updatePilotProfile,
    loadPilotProfile,
    createIndividualOperatorProfile,
    updateIndividualOperatorProfile,
    loadIndividualOperatorProfile
};

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch("https://localhost:9443/api/user", requestOptions).then(handleResponse);
}

function login(credentials) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    };

    return fetch("https://localhost:9443/api/auth/token", requestOptions)
                .then(handleResponse)
                .then(token => {
                    if (token.accessToken) {
                      localStorage.setItem('accessToken', token.accessToken);
                      localStorage.setItem('userId', token.id);
                      localStorage.setItem('pilotProfileId', token.pilotProfileId);
                      localStorage.setItem('individualOperatorProfileId', token.individualOperatorProfileId);
                      localStorage.setItem('organizationOperatorProfileId', token.organizationOperatorProfileId);
                    }
                });
}

function logout(){
    localStorage.removeItem('accessToken');
}

function sendResetPasswordLink(email) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(email)
    };

    return fetch("https://localhost:9443/api/user/resetPasswordLink", requestOptions).then(handleResponse);
}

function resetPassword(payload) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    return fetch("https://localhost:9443/api/user/resetPassword", requestOptions).then(handleResponse);
}

function createPilotProfile(pilotProfile) {
    const authToken = ('Bearer ' +  localStorage.getItem('accessToken'));
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: authToken },
        body: JSON.stringify(pilotProfile)
    };

    return fetch("https://localhost:9443/api/pilot", requestOptions)
                .then(handleResponse)
                .then(response => {
                    if (response.id) {
                      localStorage.setItem('pilotProfileId', response.id);
                    }
                });
}

function updatePilotProfile(pilotProfileId, pilotProfile) {
    const authToken = ('Bearer ' +  localStorage.getItem('accessToken'));
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: authToken },
        body: JSON.stringify(pilotProfile)
    };
    return fetch("https://localhost:9443/api/pilot/"+pilotProfileId, requestOptions).then(handleResponse);
}

function loadPilotProfile(pilotProfileId) {
    const authToken = ('Bearer ' +  localStorage.getItem('accessToken'));
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: authToken }
    };

    return fetch("https://localhost:9443/api/pilot/"+pilotProfileId, requestOptions).then(handleResponse);

}

function createIndividualOperatorProfile(individualOperatorProfile) {
    const authToken = ('Bearer ' +  localStorage.getItem('accessToken'));
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: authToken },
        body: JSON.stringify(individualOperatorProfile)
    };

    return fetch("https://localhost:9443/api/operator", requestOptions)
                .then(handleResponse)
                .then(response => {
                    if (response.id) {
                      localStorage.setItem('individualOperatorProfileId', response.id);
                    }
                });
}

function updateIndividualOperatorProfile(individualOperatorProfileId, individualOperatorProfile) {
    const authToken = ('Bearer ' +  localStorage.getItem('accessToken'));
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: authToken },
        body: JSON.stringify(individualOperatorProfile)
    };
    return fetch("https://localhost:9443/api/operator/"+individualOperatorProfileId, requestOptions).then(handleResponse);
}

function loadIndividualOperatorProfile(individualOperatorProfileId) {
    const authToken = ('Bearer ' +  localStorage.getItem('accessToken'));
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: authToken }
    };

    return fetch("https://localhost:9443/api/operator/"+individualOperatorProfileId, requestOptions).then(handleResponse);

}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const errors = (data && data.errors) || [data.toString()];
            return Promise.reject(errors);
        }
        return data;
    });
}