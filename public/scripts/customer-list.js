ratingColor = () => {
  let el = document.querySelectorAll("[id='salary']");

  for (let index = 0; index < el.length; index++) {
    const element = el[index];

    if (element.innerHTML <= 980) {
      // element.className = 'badgeA';
    }
  }
};
document.getElementById('salary').onload = ratingColor();
