
async function fetchDogImage() {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        console.log(data.message);

        displayDogImage(data.message);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        document.querySelector('#api-data').innerHTML = `<h2>Error</h2><p>Failed to fetch dog image. Please try again later.</p>`;
    }
}

function displayDogImage(imageUrl) {
    const apiDataDiv = document.querySelector('#api-data');
    apiDataDiv.innerHTML = `
        <h2>Random Dog Image</h2>
        <img id="dog-image" src="${imageUrl}" alt="Random dog">
        <p>Refresh the page to see a new dog!</p>
    `;
}

// Fetch data when the page loads
fetchDogImage();
    