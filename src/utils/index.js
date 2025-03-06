const formattedDate = (date) => {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  })
    .format(new Date(date))
    .replace("pukul ", "");
};

const saveHistoryRead = (article) => {
  let storedNews = JSON.parse(localStorage.getItem("readNews")) || [];
  if (!storedNews.some((item) => item.url === article.url)) {
    storedNews.push({ title: article.title, url: article.url, image: article.urlToImage });
    localStorage.setItem("readNews", JSON.stringify(storedNews));
  }
};

export { formattedDate, saveHistoryRead };
