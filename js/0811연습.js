const $container = document.querySelector(".container");
axios.get("../data/0811연습.json")
.then(function(res){
    // console.log(res)
    res.data.main1.map((e,i)=>{
        console.log(e)
        let $containerWrap = document.createElement("div");
        $containerWrap.className = "container-wrap"
        
        let $leftBox = document.createElement("div");
        $leftBox.className = "container-leftbox"
        $leftBox.textContent = e.title
        $leftBox.style.fontSize = "20px"
        $containerWrap.appendChild($leftBox)

        let $subscribe = document.createElement("div");
        $subscribe.className = "subscribe"
        $subscribe.textContent = e.desc
        $leftBox.appendChild($subscribe)

        


        document.querySelector(".container").appendChild($containerWrap)
    })
})
.catch(function(error){
    console.log(error)
})
