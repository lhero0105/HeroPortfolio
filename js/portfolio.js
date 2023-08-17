// alert()
const $CateList = document.querySelectorAll(".cateList li")
$CateList[0].classList.add("on")
const $container = document.querySelector(".port-content")

function PortfolioData(data){
    data.map((e,i)=>{
        console.log(e)
        let div = document.createElement("div");
        div.className = "bg-white mb-8 pt-12 group px-8 pb-16 rounded-md flex border dark:bg-[#272929] dark:text-[ebf4f1] flex-wrap";

        let div_child1 = document.createElement("div");
        div_child1.className = "basis-[48%] relative mokup-img group-even:order-1 xl:group-even:order-2";

        for(let a = 1; a <= 3; a++){
            let div_ = document.createElement("div");
            let img_ = document.createElement("img");
            
            
            img_.className = "w-full";
            img_.src = `images/mokup-${a}.png`;
            img_.alt = `mokup`
            div_.appendChild(img_);
            div_child1.appendChild(div_);
        }


        let div_child2 = document.createElement("div");
        div_child2.className = "basis-[52%] group-even:order-2 xl:group-even:order-1 pt-10";

        let h3 = document.createElement("h3")
        h3.className = "text-2xl font-bold pt-[10px] pb-[10px] lg:pl-[50px]";
        h3.textContent = e.descTitle
        div_child2.appendChild(h3)

        let descs = [
            e.desc,
            "키워드 : ",
            "컬러 : ",
            "폰트 : "+e.font,
            "사용툴 : ",
            "작업기간 : "+e.date,
            "기여도 : "+e.contribution
        ]

        for(let a = 0; a < descs.length; a++){
            let p = document.createElement("p");
            p.className = "text-base pt-[10px] pb-[10px] lg:pl-[50px]"
            
            if(a === 1 && e.keyword){
                let text = "키워드 : ";
                e.keyword.forEach(el =>{
                    text += el + " ";
                })
                p.textContent = text;
            }else if(a === 2 && e.color){
                let text = "컬러 : ";
                e.color.forEach(el =>{
                    let span = document.createElement("span");
                    span.className = "w-5 h-5 inline-block align-middle mr-2";
                    span.style.backgroundColor = el;
                    p.appendChild(span)
                })
                p.prepend(text)
                // append 앞쪽 prepend 뒤쪽
            }else if(a === 4 && e.tools){
                let text = "사용툴 : ";
                // e.tools.forEach(el =>{
                //     text += el + " ";
                // })
                text += e.keyword.join();
                p.textContent = text;
            }else{
                p.textContent = descs[a];
            }
            // json 에 배열로 되어있기에

            div_child2.appendChild(p)
        }
        let ul = document.createElement("ul");
        ul.className = "flex justify-center mt-6"
        div_child2.appendChild(ul);

        
        const createList = (href, text) => {
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.classList.add("py-3","px-8","border","rounded-md","dark:bg-[#272929]","dark:text-[#ebf4f1]","text-sm","mr-4");
            // 기존에는 on하나만 선택했지만 다중으로 선택할 때 사용하면 됨
            a.href = href
            a.textContent = text
            a.setAttribute("target", "_blank");

            
            li.appendChild(a);
            return li;
        }

        if(e.original){
            
            ul.appendChild(createList(e.original, "Original"));
        }
        if(e.create){

            ul.appendChild(createList(e.create, "Create"));
            // ul.appendChild(li);
        }
        if(e.git){

            ul.appendChild(createList(e.git, "Git"));
            // ul.appendChild(li);
        }

        div.appendChild(div_child1)
        div.appendChild(div_child2)
        $container.append(div)
    })
}


$CateList.forEach((e,i)=>{
    // console.log(e,i)
    e.addEventListener("click", ()=>{
        // alert(i)
        $CateList.forEach((el,index)=>{
            $CateList[index].classList.remove("on")
        })
        const $attr = e.getAttribute("data-type");
        // html에 쓴 data-type 을 변수 $attr로 지정
        // alert($attr)
        $CateList[i].classList.add("on")

        axios.get("../data/data.json")
        .then(function(res){
            let PortData;
            if($attr === "전체"){
                PortData = res.data.Portfolio
            }else{
                PortData = res.data.Portfolio.filter(item => item.type == $attr)
                // filter 할 떄 item을 많이 작명
                // filter 사용 시 값을 바로 보내야 하니까 중괄호를 안씀
                // {}는 값을 바로 반환 할 때
                // 바로 보낼 때는 중괄호 생략
            }
            PortfolioData(PortData);
        })
        .catch(function(error){
            console.log(error)
        })

        $container.innerHTML = '';
        // 기존의 데이터가 쌓이지 않도록 날려버린다고 ''으로 설정
    })
})

axios.get("data/data.json")
.then(function(res){
    // console.log(res)
    PortfolioData(res.data.Portfolio)
})
.catch(function(error){
    console.log(error)
})