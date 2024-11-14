alert("Xush kelibsiz");

document.addEventListener("DOMContentLoaded", loadJobs); // Sahifa yuklanganda saqlangan cardlarni olib chiqish

function saveJob(event) {
    event.preventDefault();
    const logoURL = document.getElementById("logoURL").value;
    const companyName = document.getElementById("companyName").value;
    const position = document.getElementById("position").value;
    const time = document.getElementById("time").value;
    const jobType = document.getElementById("jobType").value;
    const location = document.getElementById("location").value;

    if (!logoURL || !companyName || !position || !time || !jobType || !location) {
        alert("Barcha maydonlarni to'ldiring!");
        return;
    }

    showData();
}

function showData() {
    const logoURL = document.getElementById("logoURL").value;
    const companyName = document.getElementById("companyName").value;
    const isNew = document.getElementById("new").checked ? "<span class='tag new-tag'>NEW!</span>" : "";
    const isFeatured = document.getElementById("featured").checked ? "<span class='tag featured-tag'>FEATURED</span>" : "";
    const position = document.getElementById("position").value;
    const time = document.getElementById("time").value;
    const jobType = document.getElementById("jobType").value;
    const location = document.getElementById("location").value;

    let skills = [];
    if (document.getElementById("fullstack").checked) skills.push("Fullstack");
    if (document.getElementById("midweight").checked) skills.push("Midweight");
    if (document.getElementById("python").checked) skills.push("Python");
    if (document.getElementById("react").checked) skills.push("React");

    const cardId = `card-${Date.now()}`;
    const cardHTML = `
        <div class="job-card" id="${cardId}">
            <img src="${logoURL}" alt="Logo">
            <div class="job-info">
                <div class="fture">
                    <div class="bloc">
                        <p><strong>${companyName}</strong> ${isNew} ${isFeatured}</p>
                        <h3>${position}</h3>
                        <p>${time} • ${jobType} • ${location}</p>
                    </div>
                    <div class="bloc2">
                        <div class="tag-container">
                            ${skills.map(skill => `<span class="tag">${skill}</span>`).join(' ')}
                        </div>
                    </div>
                </div>
            </div>
            <button class="delete-btn" onclick="deleteCard('${cardId}')">X</button>
        </div>
    `;

    document.getElementById("output").insertAdjacentHTML('beforeend', cardHTML);

    const jobData = { logoURL, companyName, isNew, isFeatured, position, time, jobType, location, skills };
    localStorage.setItem(cardId, JSON.stringify(jobData));

    document.getElementById("jobForm").reset();
}

function loadJobs() {
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith("card-")) {
            const jobData = JSON.parse(localStorage.getItem(key));
            const cardHTML = `
                <div class="job-card" id="${key}">
                    <img src="${jobData.logoURL}" alt="Logo">
                    <div class="job-info">
                        <div class="fture">
                            <div class="bloc">
                                <p><strong>${jobData.companyName}</strong> ${jobData.isNew} ${jobData.isFeatured}</p>
                                <h3>${jobData.position}</h3>
                                <p>${jobData.time} • ${jobData.jobType} • ${jobData.location}</p>
                            </div>
                            <div class="bloc2">
                                <div class="tag-container">
                                    ${jobData.skills.map(skill => `<span class="tag">${skill}</span>`).join(' ')}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="delete-btn" onclick="deleteCard('${key}')">X</button>
                </div>
            `;
            document.getElementById("output").insertAdjacentHTML('beforeend', cardHTML);
        }
    });
}

function deleteCard(cardId) {
    if (confirm("Rostan ham o'chirmoqchimisiz?")) {
        document.getElementById(cardId).remove();
        localStorage.removeItem(cardId);
    }
}
