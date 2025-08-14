let templates = {};

fetch('templates.json')
  .then(res => res.json())
  .then(data => templates = data);

function generateEmail() {
  const vet = document.getElementById('vetName').value || "[Vet Name]";
  const pet = document.getElementById('petOwner').value || "[Pet Name]";
  const date = document.getElementById('submitDate').value || "[Date]";
  const consult = document.getElementById('consultation').value;
  const templateKey = document.getElementById('template').value;

  let template = templates[templateKey];

  let writtenSection = (consult === 'written' || consult === 'both') ? 
      "You will receive your written specialist report within 2 UK business days of payment being received.\n\n" : "";
  
  let callSection = "";
  if(consult === 'call' || consult === 'both') {
      const callDate = new Date();
      callDate.setDate(callDate.getDate() + 2);
      const dd = String(callDate.getDate()).padStart(2, '0');
      const mm = String(callDate.getMonth()+1).padStart(2, '0');
      const yyyy = callDate.getFullYear();
      const dateStr = `${yyyy}-${mm}-${dd}`;
      callSection = `Please choose from the following available times for the call:\n${dateStr} 12:15 UK time\n${dateStr} 19:30 UK time\n\n`;
  }

  let email = template
      .replace("{vet}", vet)
      .replace("{pet}", pet)
      .replace("{date}", date)
      .replace("{consult}", consult)
      .replace("{writtenSection}", writtenSection)
      .replace("{callSection}", callSection);

  document.getElementById('result').value = email;
}

function copyEmail() {
  const textarea = document.getElementById('result');
  textarea.select();
  textarea.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Email copied to clipboard!");
}
