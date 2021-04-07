const news = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=e6acdaca30f84fd88b77740664aa6a6d";


function renderArticles(articles)
{

    console.log({aSingleArticle: articles[0]});
    const newsList = document.getElementById("news-list")

    const articlesHTMLArray = articles.map((a) => {
        return `
        <div class="card mb-5" style="width: 18rem;">
        <img src="${a.urlToImage}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${a.title}</h5>
          <p class="card-text">${a.description}</p>
          <a href="${a.url}" class="btn btn-primary">Read</a>
        </div>
      </div>
      `;
    });
    newsList.innerHTML=articlesHTMLArray.join('') // add .join to eliminate all the "," in the text 
}


function fetchData (){
    const promise = fetch(news);
    promise
    .then((res) => res.json ()) 
    .then((data) => renderArticles(data.articles));
}
 
fetchData();
 
// function renderArticles(aritcles)
// {
//     console.log({aSingleArti cle: article[0]});
//     const articleHTMLArray = articles.map(a) => {
//         return 
//     }
// }