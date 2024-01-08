export const getId = (id) => {
  return document.getElementById(id)
}

export const formatDate = (tanggalISO) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const tanggal = new Date(tanggalISO).toLocaleDateString('id-ID', options);
  return tanggal;
}

export const themeOfPage = (theme) => {
  const htmlElement = document.querySelector('html')
  htmlElement.setAttribute('data-theme', theme);
  const htmlElementNow = document.querySelector('html').getAttribute('data-theme')
  return htmlElementNow
  // setTimeout(() => {
    // setTheme(htmlElementNow)
  // }, 100);

}

export const limitText = (text, limit) => {
  if (text.length <= limit) {
    return text;
  } else {
    return text.slice(0, limit) + "...";
  }
}