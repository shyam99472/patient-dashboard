const API_URL = "https://fedskillstest.coalitiontechnologies.workers.dev";

async function loadData() {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: "Basic " + btoa("coalition:skills-test")
    }
  });

  const data = await res.json();
  const patient = data[0];

  console.log(patient); 
  console.log(patient.lab_results); 

  
  name.innerText = patient.name;
  age.innerText = patient.age;
  gender.innerText = patient.gender;
  img.src = patient.profile_picture;

  dob.innerText = patient.date_of_birth;
  phone.innerText = patient.phone_number;
  address.innerText = patient.address;

  const history = patient.diagnosis_history;

  
  const latest = history[0];
  heart.innerText = latest.heart_rate.value;
  temp.innerText = latest.temperature.value;
  resp.innerText = latest.respiratory_rate.value;
  bp.innerText =
    latest.blood_pressure.systolic.value + "/" +
    latest.blood_pressure.diastolic.value;

  tableBody.innerHTML = ""; 
  history.forEach(h => {
    tableBody.innerHTML += `
      <tr>
        <td>${h.month}</td>
        <td>${h.blood_pressure.systolic.value}/${h.blood_pressure.diastolic.value}</td>
        <td>${h.heart_rate.value}</td>
        <td>${h.temperature.value}</td>
      </tr>
    `;
  });
  labs.innerHTML = "";

patient.lab_results.forEach(l => {
  labs.innerHTML += `
    <div class="lab-card">${l}</div>
  `;
});
  new Chart(chart, {
    type: "line",
    data: {
      labels: history.map(h => h.month),
      datasets: [
        {
          label: "Systolic",
          data: history.map(h => h.blood_pressure.systolic.value)
        },
        {
          label: "Diastolic",
          data: history.map(h => h.blood_pressure.diastolic.value)
        }
      ]
    }
  });
}

loadData();
