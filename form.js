const submit = document.getElementById('submit');

const saveLead = async () => {
    let clientFirstName = document.getElementById('first_name').value;
    let clientLastName = document.getElementById('last_name').value;
    let clientEmail = document.getElementById('email').value;
    let clientMobile = document.getElementById('mobile').value;

    let response2 = await fetch('https://render-formthing-api.onrender.com/lead/save', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: clientFirstName,
            lastName: clientLastName,
            email: clientEmail,
            mobile: clientMobile
        })
    })

    // console.log("response " + response2);
    // let data = await response2.json();
    // console.log(data);
    // alert(data.firstName);
}

submit.addEventListener('click', async function () {
    await saveLead();
    // document.getElementById('first_name').value = "";
    // document.getElementById('last_name').value = "";
    // document.getElementById('email').value = "";
    // document.getElementById('mobile').value = "";

    window.location.href = 'display.html';
});

