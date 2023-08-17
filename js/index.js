let dark = false;
function darkMode() {
    // alert()
    if (dark == false) {
        // == 과 = 구분 조심
        dark = true;
        document.querySelector(".fa-moon").classList.add("fa-sun")
        document.querySelector(".fa-moon").classList.remove("fa-moon")
        document.querySelector("html").classList.add("dark")

        localStorage.setItem("dark", true);
        // 새로고침 할 때 유지
        // f12 Application 안에 확인
        // 로컬은 내가 지우지 않는한 지워지지않고 세션은 없어짐
    } else {
        dark = false;
        document.querySelector(".fa-sun").classList.add("fa-moon")
        document.querySelector(".fa-sun").classList.remove("fa-sun")
        document.querySelector("html").classList.remove("dark")
        localStorage.removeItem("dark")
        // 새로고침 시 다크모드로 돌아가는거 방지
    }
    // console.log(dark);
}

const dark_mode = localStorage.getItem("dark");
// console.log(dark_mode)
if (dark_mode == "true") {
    darkMode()
    // darkMode 함수로 클린코딩 공부
}

function language(lang){
    if(lang == "en"){
        localStorage.setItem("lang", "en");
    }else{
        localStorage.removeItem("lang", "en");
    }
}
const $lang = localStorage.getItem("lang")
// 다국어
const url = new URL(location.href).searchParams;
//location.href - 위의 주소를 의미
// console.log(url)
const lang = url.get("Lang")
// console.log(lang)

localStorage.setItem("lang", lang);

const chkLang = localStorage.getItem("lang");
// console.log(chkLang)


axios.get("../data/data.json")
.then(function(res){
    // console.log(res)
    if ($lang == "en") {
        res.data.EnNav.map((e,i)=>{
            // console.log(e)
            document.querySelectorAll(".list li a")[i].textContent = e.title
            // ul을 클래스 list 추가
        })
    }

    if($lang == "en"){
        localStorage.setItem("lang", "en");
    }else{
        localStorage.removeItem("lang", "en");
    }
})

.catch(function(error){
    console.log(error)
})


//코드를 위에서 읽어 내리는것 주의

// 다국어

// 모바일 네비

function mNav(){
    document.querySelector(".m-btn").classList.toggle("on")
    // alert()
}


// 모바일 네비