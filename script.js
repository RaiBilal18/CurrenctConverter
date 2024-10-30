const BASE_URL ="https://open.er-api.com/v6/latest";

let dropDowns=document.querySelectorAll('.selectmenu select');
let btn=document.querySelector('form button');
let fromcurr=document.querySelector('#from select');
let tocurr=document.querySelector('#To select');
let msg=document.querySelector('#message');
let famt=document.querySelector("#amountcontainer");

for (let select of dropDowns) {
    for (currcode in countryList) {
        let newoption=document.createElement('option');
        newoption.innerText=currcode;
        newoption.value=currcode;
        select.append(newoption);
        if(select.name === "fromdd" && currcode==="USD"){
            newoption.selected="selected";
        } else if(select.name==="Todd" && currcode==="PKR"){
            newoption.selected="selected";
        }
    }
    select.addEventListener('change',(evt)=>{
        updateflag(evt.target);
    })
}
function updateflag(Element){
    let currcode=Element.value;
    let countrycode=countryList[currcode];
    let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=Element.parentElement.querySelector('img');
    img.src=newSrc;
}
const updateExchangeRate=async()=>{
    if(famt.value<1 || famt.value===""){
        famt.value=1;
}
let URL=`${BASE_URL}/${fromcurr.value}`;
try {
let Response = await fetch(URL);
let data =await  Response.json();
if(data && data.rates){
    let fromRate=data.rates[fromcurr.value];
    let toRate=data.rates[tocurr.value];
    let convertedAmount = ((famt.value * toRate) / fromRate).toFixed(2);
    msg.innerText=`${famt.value}${fromcurr.value} = ${convertedAmount}${tocurr.value}`;
}else{
    msg.innerText="Error retrieving exchange rates.";
}} catch (error) {
    msg.innerText="Failed to fetch data. Please try again later.";
    console.log("There is an issue to fetching data");
}
}
btn.addEventListener('click',(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})
window.addEventListener("load",()=>{
    updateExchangeRate();
})