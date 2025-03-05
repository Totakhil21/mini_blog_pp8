document.getElementById('post-form').onsubmit = validate;

function validate() {
    clearErrors();

    let isValid = true;

    let author = document.getElementById('author').value.trim();
    if (author === "" || /\d/.test(author)) {
        document.getElementById("err-author").style.display = "block";
        isValid = false;
    }

    let title = document.getElementById('title').value.trim();
    if (title === "") {
        document.getElementById("err-title").style.display = "block";
        isValid = false;
    }

    let content = document.getElementById('content').value.trim();
    if (content.length < 10) {
        document.getElementById("err-content").style.display = "block";
        isValid = false;
    }
    
    return isValid;
}

function clearErrors() {
    let errors = document.getElementsByClassName('err');
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}
