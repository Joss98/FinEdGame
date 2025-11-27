// Manage interactions with external APIs
// Scope: 
//  - Prepare player data for end-game API call
//  - Make API call and process API response

async function sendPlayerDataToAPI(playerData) {
    console.log("Sending player data to API...", playerData);

    // Simulate API delay
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockResponse = {
                feedback: "Based on your decisions, you have shown a strong aptitude for saving, but could take more risks with investments. Your net worth is healthy for your age.",
                score: 85
            };
            resolve(mockResponse);
        }, 2000);
    });
}

function receivePlayerDataFromAPI(response) {
    console.log("Received response from API:", response);
    return response;
}