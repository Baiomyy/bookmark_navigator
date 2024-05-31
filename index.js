var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var submitButton = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var modal = document.querySelector(".box-info");
var closeButton = document.getElementById("closeBtn");
var bookmarksArr = [];

if (JSON.parse(localStorage.getItem("bookmarksList")) !== null) {
  bookmarksArr = JSON.parse(localStorage.getItem("bookmarksList"));
  displayBookmarks();
}

submitButton.addEventListener("click", addBookmark);


function addBookmark() {
  if (bookmarkName.classList.contains("is-valid") && bookmarkURL.classList.contains("is-valid")) {
    var bookmark = {
      name: bookmarkName.value,
      URL: bookmarkURL.value
    }

    bookmarksArr.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarksArr));
    displayBookmarks();
    clearForm();
    bookmarkName.classList.remove("is-valid");
    bookmarkURL.classList.remove("is-valid");

  } else {
    modal.classList.remove("d-none");
  }

}

function displayBookmarks() {
  var bBox = '';

  for (var i = 0; i < bookmarksArr.length; i++) {
    bBox += `<tr>
        <td>${i + 1}</td>
        <td>${bookmarksArr[i].name}</td>              
        <td>
          <button class="btn btn-visit" index="${i}">
            <i class="fa-solid fa-eye pe-2"></i>Visit
          </button>
        </td>
        <td>
        <button class="btn btn-delete pe-2" index="${i}">
        <i class="fa-solid fa-trash-can"></i>
        Delete
      </button>
        </td>
    </tr>`
  }

  tableContent.innerHTML = bBox;

  var deletedButtons = document.querySelectorAll(".btn-delete");
  var visitedButtons = document.querySelectorAll(".btn-visit");


  if (deletedButtons) {
    for (var i = 0; i < deletedButtons.length; i++) {

      deletedButtons[i].addEventListener("click", function (e) {
        deleteBookmark(e);
      });

      visitedButtons[i].addEventListener("click", function (e) {
        visitBookmark(e);
      });
    }
  }
}

function deleteBookmark(e) {
  var deletedIndex = e.currentTarget.getAttribute("index");
  bookmarksArr.splice(deletedIndex, 1);
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarksArr));
  displayBookmarks();
}

function visitBookmark(e) {
  var visitedIndex = e.currentTarget.getAttribute("index");
  var regex = /^https?:\/\//

  if (regex.test(bookmarksArr[visitedIndex].URL)) {
    window.open(bookmarksArr[visitedIndex].URL);
  } else {
    window.open(`https://${bookmarksArr[visitedIndex].URL}`);
  }
}

function validateFormInputs() {
  var regex = {
    bookmarkName: /^[\w\s\-]{3,255}$/,
    bookmarkURL: /^(https?:\/\/)?([a-zA-Z0-9\-_]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/
  }

  var inputFields = document.querySelectorAll(".form-control");

  for (var i = 0; i < inputFields.length; i++) {
    inputFields[i].addEventListener("input", function () {
      var isValid = regex[this.id].test(this.value);

      if (isValid) {
        console.log("matched");
        if (this.classList.contains("is-invalid")) {
          this.classList.replace("is-invalid", "is-valid")
        } else {
          this.classList.add("is-valid");
        }
      } else {
        console.log("not matched");
        if (this.classList.contains("is-valid")) {
          this.classList.replace("is-valid", "is-invalid")
        } else {
          this.classList.add("is-invalid");
        }
      }

    })

  }
}

function clearForm() {
  bookmarkName.value = '';
  bookmarkURL.value = '';
}




function closeModal() {
  modal.classList.add("d-none");
}



closeButton.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("box-info")) {
    closeModal();
  }
})

validateFormInputs();




