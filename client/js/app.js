// ********************************************
// SETUP
const form = document.querySelector("#new-entry-form");
const camera = document.getElementById("story");
const cameraIcon = document.querySelector("i");
const urlImage2 = document.getElementById("urlImage2");
const image = document.getElementById("image");
const storyImage = document.getElementById('storyImage')
const titleLabel = document.getElementById('titleLabel')
const nameLabel = document.getElementById('nameLabel')
const storyLabel = document.getElementById('storyLabel')


// Bind event listeners
form.addEventListener("submit", submitItem);
camera.addEventListener("focus", showCamera);
cameraIcon.addEventListener("click", cameraClicked);

function cameraClicked() {
  urlImage2.style.display = "block";
}

function showCamera() {
  cameraIcon.style.display = "inline";
}

// ********************************************

// Shop FLOW
//
window.addEventListener("DOMContentLoaded", getItemByID());
function getItemByID() {
  cameraIcon.style.display = "none";
  urlImage2.style.display = "none";
  image.style.display = "none";
  let currentId = sessionStorage.getItem("previousId");
  let currentUrl = sessionStorage.getItem("previousUrl");
  console.log("urlImage" + currentUrl)
  if (currentId) {
    
    fetch(`http://localhost:3000/posts/${currentId}`)
      .then((r) => r.json())
      .then((data) => {
        let dt = new Date();
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        document.getElementById("author").value =
          data.author +
          " • " +
          dt.getDate() +
          " " +
          months[dt.getMonth()] +
          ", " +
          dt.getFullYear();
        document.getElementById("title").value = data.title;
        document.getElementById("story").value = data.story;
        console.log("image" + currentUrl);
        titleLabel.style.display = "none"
        nameLabel.style.display = "none"
        storyLabel.style.display = "none"
        cameraIcon.style.display = "none"
        if (currentUrl) {
          urlImage2.style.display = "none";
          image.style.display = "block"
          storyImage.src = currentUrl;
        }
      })
      .catch(console.warn);
  }
 
}

// create
function submitItem(e) {
  e.preventDefault();
  let storedUrl = e.target.urlImage.value;
  sessionStorage.setItem("previousUrl", storedUrl);
  console.log(storedUrl);
  titleLabel.style.display = "none"
  nameLabel.style.display = "none"
  storyLabel.style.display = "none"
  cameraIcon.style.display = "none"
  if (storedUrl) {
    urlImage2.style.display = "none";
    image.style.display = "block"
    storyImage.src = storedUrl;
  }
  
  const ourData = {
    title: e.target.title.value,
    author: e.target.author.value,
    story: e.target.story.value,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(ourData),
    headers: { "Content-Type": "application/json" },
  };

  fetch("http://localhost:3000/posts", options)
    .then((r) => r.json())
    .then((data) => {
      let createdId = data.id;
      sessionStorage.setItem("previousId", createdId);
      console.log(createdId);
      let dt = new Date();
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      document.getElementById("author").value =
        data.author +
        " • " +
        dt.getDate() +
        " " +
        months[dt.getMonth()] +
        ", " +
        dt.getFullYear();
    })
    .catch(console.warn);
}

