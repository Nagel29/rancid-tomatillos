const fetchData = (endPoint) => {
    return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/${endPoint}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error
        }})
}

export default fetchData