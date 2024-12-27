const form = document.querySelector('form')

const nameInput = document.getElementById('name')
const whatsappInput = document.getElementById('whatsapp')
const intentDateInput = document.getElementById('intentDate')
const intentHourInput = document.getElementById('intentHour')
const serviceInput = document.getElementById('service')


const baseUrl = 'http://localhost:3009/send-schedule'

async function sendSchedule(e) {

    e.preventDefault()


    const payload = {
        name: nameInput.value,
        whatsapp: whatsappInput.value,
        intentDate: intentDateInput.value,
        intentHour: intentHourInput.value,
        service: serviceInput.value
    }

    try {

        const response = await fetch(
            baseUrl,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }
        )

        if (response.ok) {
            const result = response.json()
            window.location.href = 'obrigado.html'
        }

    } catch (err) {
        console.error(err)
    }

}

form.addEventListener('submit', sendSchedule)