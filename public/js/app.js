


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const  msg1=document.querySelector('#m1')
const  msg2=document.querySelector('#m2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault() //toavoid refresh imediately
    const loc=search.value
    
    var url='http://localhost:8080/weather?address='+loc
    fetch(url).then((response)=>{
    response.json().then((data)=>
{
    if(data.error)
    msg1.textContent=(data.error)
    else{
        msg2.textContent=(data.forecast)
}
})
})

})