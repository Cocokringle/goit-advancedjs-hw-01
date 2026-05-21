const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const loadSavedData = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);

      formData.email = parsedData.email ?? '';
      formData.message = parsedData.message ?? '';

      form.elements.email.value = formData.email;
      form.elements.message.value = formData.message;
    } catch (error) {
      console.error('Parse error:', error);
    }
  }
};

loadSavedData();

form.addEventListener('input', event => {
  const fieldName = event.target.name;
  const fieldValue = event.target.value;

  formData[fieldName] = fieldValue.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);

  formData.email = '';
  formData.message = '';

  form.reset();
});
