(() => {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbxoylOcW1F7wQVDsez3DXjEdAiWu_1LSUegpoTjuwhFuo4jcJy9LSZmjIQPouH4lb_RNQ/exec';
  const form = document.getElementById('register-form');
  if (!form) return;

  const submitBtn = document.getElementById('submit-btn');
  const label = submitBtn.innerText;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const honeypot = document.getElementById('not_hp').value;
    if (honeypot !== '') return;

    submitBtn.disabled = true;
    submitBtn.innerText = 'Sending details...';

    const data = {
      firstName: document.getElementById('first-name').value.trim(),
      lastName: document.getElementById('last-name').value.trim(),
      email: document.getElementById('email').value.trim(),
      affiliation: document.getElementById('affiliation').value.trim(),
      regType: document.getElementById('reg-type').value,
      sbcMember: document.getElementById('sbc-member').value,
      not_hp: honeypot
    };

    fetch(scriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data)
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.status === 'success') {
          alert('Success! Your registration details have been submitted.\n\nNext step: Please complete your payment via PIX/Bank Transfer and email your proof of payment and SBC membership proof to andre.albiani.b.jr@gmail.com.');
          form.reset();
        } else {
          alert('Something went wrong (' + res.status + '). Please email andre.albiani.b.jr@gmail.com.');
        }
      })
      .catch(() => {
        alert('Request failed. Please email your details directly to andre.albiani.b.jr@gmail.com.');
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = label;
      });
  });
})();