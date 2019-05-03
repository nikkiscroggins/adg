
// Image gallery

//Destructuring
const [current, sImgs, opacity] = [document.querySelector('#current'), document.querySelectorAll('.sImgs img'), 0.4];

// Add opacity to first line
sImgs[0].style.opacity = opacity;

sImgs.forEach(img =>
  img.addEventListener('click', imgClick));

function imgClick(e) {
  //opacity reset
  sImgs.forEach(img => img.style.opacity = 1);
  //change current image to the source clicked image
  current.src = e.target.src;
  //fade in after the click
  current.classList.add('fade-in');
  //set the timeout or all images will remain clicked
  setTimeout(() => current.classList.remove('fade-in'), 500);
  //change opacity to opacity variable
  e.target.style.opacity = opacity;
}
