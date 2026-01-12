const billinput = document.getElementById('bill');

const tipbuttons = document.querySelectorAll('.tipbutton');

const customtip = document.getElementById('customtip');

const peopleinput = document.getElementById('people');

const tipamountdisplay = document.getElementById('tipamountdisplay');

const totalamountdisplay = document.getElementById('totalamountdisplay');

const resetbutton = document.querySelector('.resetbutton');

billinput.addEventListener('input', function (event) {

    calculatetip();

});

tipbuttons.forEach(button => {
    button.addEventListener('click', event => {

        const clickedbutton = event.target;

        const tippercent = clickedbutton.value;

        tipbuttons.forEach(btn => btn.classList.remove('active'));
        clickedbutton.classList.add('active');
        customtip.value = '';

        calculatetip();

    });
});


customtip.addEventListener('input', (event) => {

    const custtip = customtip.value;
    tipbuttons.forEach(btn => btn.classList.remove('active'));
    calculatetip();

});

peopleinput.addEventListener('input', event => {


    const peopleno = peopleinput.value;
    calculatetip();

});

resetbutton.addEventListener('click',()=>{
    resetcalculator();
});

function calculatetip() {

    const billvaluestore = billinput.value;
    const peoplevaluestore = peopleinput.value;
    const customtipvaluestore = customtip.value;

    let selectedtipbutton = null;
    const activebutton = document.querySelector('.tipbutton.active');

    if (activebutton) {
        selectedtipbutton = activebutton.value;
    }

    const billvalue = parseFloat(billvaluestore);
    const peoplevalue = parseFloat(peoplevaluestore);
    const customtipvalue = parseFloat(customtipvaluestore);

    const selectedtipbuttonvalue = selectedtipbutton ? parseFloat(selectedtipbutton) : null;

    let actualtip = 0;

    if (!isNaN(customtipvalue) && customtipvalue >= 0) {
        actualtip = customtipvalue;
    }
    else if (selectedtipbutton >= 0) {
        actualtip = selectedtipbutton;
    }
    else {
        actualtip = 0;
    }
    let isbillvalid = !isNaN(billvalue) && billvalue > 0;
    let istipvalid = !isNaN(actualtip) && actualtip >= 0;
    let iscustomtipvalid = !isNaN(customtipvalue) && customtipvalue>=0;

    let totaltipamount = 0;


    if (isbillvalid && istipvalid) {
        totaltipamount = billvalue * actualtip / 100;
    }


    let totalbill = billvalue + totaltipamount;

    let tipperperson = 0;
    let totalperperson = 0;

    let ispeoplevalid = peoplevalue > 0 && !isNaN(peoplevalue) && Number.isInteger(peoplevalue);

    if (isbillvalid && istipvalid && ispeoplevalid) {
        tipperperson = totaltipamount / peoplevalue;
        totalperperson = totalbill / peoplevalue;
    }
    else {
        tipperperson = 0;
        totalperperson = 0;

    }

    const formattip = tipperperson.toFixed(2);
    const formattotal = totalperperson.toFixed(2);

    if (isNaN(totalperperson)) {
        formattotal = '0';
    }



    tipamountdisplay.textContent = `₹${formattip}`;
    totalamountdisplay.textContent = `₹${formattotal}`;

if(billinput){
    billinput.classList.toggle('error',!isbillvalid);
}
if(peopleinput){
    peopleinput.classList.toggle('error',!ispeoplevalid);

}
if(customtip){
    customtip.classList.toggle('error',!iscustomtipvalid);

}



}

document.addEventListener('DOMContentLoaded', calculatetip);

function resetcalculator(){

        billinput.value='';
   
        customtip.value='';
    
        tipbuttons.forEach(button=>{
            button.classList.remove('active');
        })
   
        peopleinput.value=1;
        peopleinput.classList.remove('error');
  
        tipamountdisplay.textContent='₹0';
  
        totalamountdisplay.textContent='₹0';
  
    billinput.focus();

}

