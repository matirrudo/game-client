const api= ( () =>{
    const baseUrl = 'http://168.197.48.12:3000';

    const fetchObstacles = (levelId, location) => {
        const url = `${baseUrl}/obstacles/${levelId}?location=${location}`;
        return fetch(url)
        .then((result) => result.json())
        .catch(error =>{
            console.log(error);
        });
    }
    
    const fetchPortals = (levelId, type) => {
        const url = `${baseUrl}/portals/${levelId}?type=${type}`;
        return fetch(url)
        .then((result) => result.json())
        .catch(error =>{
            console.log(error);
        });
    }

    const fetchBricks = (levelId) => {
        const url = `${baseUrl}/bricks/${levelId}`
        return fetch(url)
        .then((result) => result.json())
        .catch(error =>{
            console.log(error);
        });
    }

    return {fetchObstacles, fetchPortals, fetchBricks};
})();