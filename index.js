let https = require("https");

async function listMovies (title) {
  let url = "https://jsonmock.hackerrank.com/api/movies/search/?Title="+title;
  let titles = await getMovies(url, []);
  console.log(titles);
}

async function getMovies(url, titles){
    return new Promise((resolve, reject) => {
      async function getPageRecursively(currentPage) {
        const { data, page, total_pages } = await fetchData(`${url}&page=${currentPage}`)
        for(let movie of data) {
          titles.push(movie.Title);
        }
        if(page < total_pages) {
          getPageRecursively(Number(page)+1);        
        } else {
          titles.sort();
          resolve(titles);
        }
      }
      getPageRecursively(1);
  });
} 

function fetchData(url) {
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

function main () {
  listMovies("spiderman");
}
main()