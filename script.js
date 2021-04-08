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
          <p class="card-text"> ${moment(a.publishedAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
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
 
const addScript = (language) => {
  var s = document.createElement("script");
  s.setAttribute(
    "src",
    `https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/locale/${language}.js`
  );
  document.body.appendChild(s);
};

if (window.clientInformation.language == "ko-KR") {
  addScript("ko");
} else if (window.clientInformation.language == "vi") {
  addScript("vi");
}

function stripHtml(html) {
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

$('[lang]').hide(); // hide all lang attributes on start.
$('[lang="ko"]').show(); // show just Korean text (you can change it)
$('#lang-switch').change(function () { // put onchange event when user select option from select
    var lang = $(this).val(); // decide which language to display using switch case. The rest is obvious (i think)
    switch (lang) {
        case 'en':
            $('[lang]').hide();
            $('[lang="en"]').show();
        break;
        case 'ko':
            $('[lang]').hide();
            $('[lang="ko"]').show();
        break;
        default:
            $('[lang]').hide();
            $('[lang="ko"]').show();
        }
});