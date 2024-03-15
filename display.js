document.addEventListener('DOMContentLoaded', function () {
    getLeads();
})

const allCustomers = document.getElementById('allCustomers');
const contentIterate = document.getElementById('dataIteration');
const modalFirstName = document.getElementById('modalFirstName');
const submitUpdated = document.querySelector('.submitUpdated');


const getLeads = async () => {
    let response = await fetch('https://render-formthing-api.onrender.com/lead/getLeads');
    let data = await response.json();
    console.log(response);

    console.log(data);
    data.forEach(element => {

        contentIterate.innerHTML +=
            `
            <tr>
            <td >${element.id}</td>
            <td>${element.firstName}</td>
            <td>${element.lastName}</td>
            <td>${element.email}</td>
            <td>${element.mobile}</td>
            <td>
            <button class="btn btn-primary update-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${element.id}">Update</button>
            
            <button class="btn btn-danger delete-btn" data-id="${element.id}">Delete</button>
            </td>
            </tr>
            `
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', deleteLead);
        });

        document.querySelectorAll('.update-btn').forEach(button => {
            button.addEventListener('click', openUpdateForm);
        });

    });
}



const deleteLead = async (event) => {
    const leadId = event.target.dataset.id;
    // const leadId=document.getElementById('');
    console.log("ID: " + leadId);

    let response = await fetch(`https://render-formthing-api.onrender.com/lead/deleteLead/${leadId}`, {
        method: "delete"
    })

    if (response.ok) {
        console.log("Lead deleted successfully!");
        event.target.closest('tr').remove();
    }
    else {
        console.log("NOT DELETED");

        console.log(response.status);
    }

}


const openUpdateForm = async (event) => {
    console.log("openUpdateForm() called");
    const leadId = event.target.dataset.id;
    console.log("ID: " + leadId);
    // const updateLead = document.querySelectorAll('.update');

    let response = await fetch(`https://render-formthing-api.onrender.com/lead/leadById/${leadId}`);
    let data = await response.json();
    console.log(data.id);
    const { id, firstName, lastName, email, mobile } = data;
    modalFirstName.innerHTML = (`
        
        <!-- Customer ID -->
        <fieldset disabled>
        <div class="mb-3" >
            <label for="customer_id" class="form-label">Customer ID</label>
            <input type="text" class="form-control" id="customer_id" aria-describedby="emailHelp" value="${id}">
        </div>
        </fieldset>
        
        <!-- first name -->
        <div class="mb-3" >
            <label for="first_name" class="form-label">New First Name</label>
            <input type="text" class="form-control" id="first_name" aria-describedby="emailHelp" value="${firstName}">
        </div>

        <!-- last name -->
        <div class="mb-3">
            <label for="last_name" class="form-label">New Last Name</label>
            <input type="text" class="form-control" id="last_name" aria-describedby="emailHelp" value="${lastName}">
        </div>

        <!-- email -->
        <div class="mb-3">
            <label for="email" class="form-label">New Email</label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" value="${email}">
            
        </div>

        <!-- mobile no -->
        <div class="mb-3">
            <label for="mobile" class="form-label">New Mobile no.</label>
            <input type="tel" class="form-control" id="mobile" aria-describedby="emailHelp" value="${mobile}">
        </div> 


        
        
        
        `)


    // updateLead.forEach(button => {
    //     button.addEventListener('click', function () {
    //         console.log("gu ha");
    //     });
    // })
}


const updateLead = async () => {
    let clientId = document.getElementById('customer_id').value;
    let clientFirstName = document.getElementById('first_name').value;
    let clientLastName = document.getElementById('last_name').value;
    let clientEmail = document.getElementById('email').value;
    let clientMobile = document.getElementById('mobile').value;


    let response = await fetch(`https://render-formthing-api.onrender.com/lead/updateLead/${clientId}`, {
        method: 'put',
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

    
}

submitUpdated.addEventListener('click', async function () {
    await updateLead();
    window.location.href = 'display.html';
});
