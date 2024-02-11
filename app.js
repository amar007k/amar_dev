const BASE_URL =
'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json';


const dropdowns = document.querySelectorAll(".dropdown select")
const newBtn = document.querySelector("form button");
const fromCurr = document.querySelector(".form select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
                newOption.selected = "selected"; 
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evnt)=>{
        updateFlag(evnt.target);
    });
}

const updateFlag=(element)=>{
   let currCode = element.value;
    //console.log(currCode);
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


newBtn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    //console.log(amtVal);
    if(amtVal ==="" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    const fromCurrency = fromCurr.value.toLowerCase();
    const toCurrency = toCurr.value.toLowerCase();

    // let data = {
    //     Currency: "inr",
    //     value: 83
    // }

    
   
    const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency}/${toCurrency}.json`);
    const res = await response.json();
    const conversionRate = res[toCurrency.toLowerCase()];
    console.log(conversionRate)
    msg.innerText = amtVal + " " + fromCurrency.toUpperCase() + " = " + (conversionRate * amtVal).toFixed() + " " + toCurrency.toUpperCase();
    
});
