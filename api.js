

async function getData() {
  await fetch(
    "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=Ireland",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
        "x-rapidapi-key": "6ac86e120dmsh3dfdf29be7bb8f3p18206djsnb59e2b90dca4",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
		data = data.data;
	    console.log(data);
		const {deaths, recovered, confirmed, lastReported} = data;
		console.log(deaths);
		console.log(recovered);
		console.log(confirmed);
		console.log(typeof lastReported);
		let d  = new Date(lastReported);
		console.log(d);

		document.getElementById('ireland-deaths').innerText= deaths;
		document.getElementById('ireland-recovered').innerText = recovered;
		document.getElementById('ireland-confirmed').innerText = confirmed;
		document.getElementById('ireland-reported').innerText = ` ${d.toDateString()}`;
    })
    .catch((err) => {
      console.log(err);
    });
};


getData();