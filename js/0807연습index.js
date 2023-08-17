let dark = false;
function darkMode() {
    if (dark == false) {
        dark = true;
        document.querySelector(".fp-moon").classList.add("fa-sun")
        document.querySelector(".fa-moon").classList.remove("fa-moon")
        document.querySelector("html").classList.add("dark")

        localStorage.setItem("dark", true)
    } else {
        dark = false;
        document.querySelector(".fa-sun").classList.add("fa-moon")
        document.querySelector(".fa-sun").classList.remove(".fa-sun")
        document.querySelector("html").classList.remove("dark")
        localStorage.removeItem("dark")
    }
}

const dark_mode = localStorage.getItem("dark");
if (dark_mode == "true") {
    darkMode()
}

const url = new URL(location.href).searchParams;
const lang = url.get("Lang")

localStorage.setItem("lang", lang);

const chkLang = localStorage.getItem("lang");

axios.get("../data/0807연습data.json")
    .then(function (res) {

        if (lang == "en") {
            res.data.EnNav.map((e, i) => {
                document.querySelectorAll(".list li a")[i].textContent = e.title

            })
        }
    })
    .catch(function (error) {
        console.log(error)

    })

function mNav(){
    document.querySelector(".m-btn").classList.toggle("on")
}