 alert("Xush kelibsiz")
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


    const cardHTML = `
        <div class="job-card" id="card-${Date.now()}">
            <img src="${"https://picsum.photos/200/300"}" alt="Logo">
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
            <button class="delete-btn" onclick="deleteCard('card-${Date.now()}')">X</button>
        </div>
    `;

    document.getElementById("output").insertAdjacentHTML('beforeend', cardHTML);


    const jobData = {
        logoURL,
        companyName,
        isNew,
        isFeatured,
        position,
        time,
        jobType,
        location,
        skills
    };
    localStorage.setItem(`job-${Date.now()}`, JSON.stringify(jobData));

    document.getElementById("jobForm").reset();
}
function deleteCard(cardId) {
    const card = document.getElementById(cardId);
    card.remove();


    const jobData = JSON.parse(localStorage.getItem(`job-${cardId.split('-')[1]}`));
    localStorage.removeItem(`job-${cardId.split('-')[1]}`);
}
