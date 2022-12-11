const fetchData = (endPoint) => {
    return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/${endPoint}`)
      .then(response => {
        if (response.status > 400) {
          throw response
        } else {
          return response.json()
        }})
}

export default fetchData