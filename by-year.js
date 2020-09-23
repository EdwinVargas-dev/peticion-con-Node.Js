let https = require("https");

async function listMoviesByYear(year) {
  let url = "https://jsonmock.hackerrank.com/api/movies?Year=" + year;
  let moviesByYear = await getMoviesByYear(url, []);
  console.log(moviesByYear);
}

async function getMoviesByYear(url, titles) {
  return new Promise((resolve, reject) => {
    async function getPageRecursivelyByYear(currentPage) {
      const { data, page, total_pages } = await fetchDataByYear(`${url}&page=${currentPage}`)
      for(let movie of data) {
        titles.push(movie);
      }
      if (page < total_pages) {
        getPageRecursivelyByYear(Number(page) + 1);
      } else {
        resolve(titles);
      }
    }
    getPageRecursivelyByYear(1);
  });
}

function fetchDataByYear(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let dataBrute = "";

      res.on('data', (chunk) => {
        dataBrute += chunk;
      });

      res.on('end', () => {
        let dataParsed = JSON.parse(dataBrute);
        resolve(dataParsed);
      });

      res.on('error', reject);
    });
  });
}

listMoviesByYear(2000);
