document.addEventListener('DOMContentLoaded', () => {
  const modalBackdrop = document.querySelector('.backdrop');
  const openModalButton = document.querySelector('.registration-button-mobil');
  const closeModalButton = document.querySelector('.modal-btn');
  const formMain = document.querySelector('.registration-form');
  const formModal = document.querySelector('.registration-form-modal');

  // Function to toggle modal visibility
  function toggleModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.toggle('is-open');
      document.body.classList.toggle(
        'no-scroll',
        modalBackdrop.classList.contains('is-open')
      );
    }
  }

  // Event listeners for opening and closing modal
  if (openModalButton && closeModalButton) {
    openModalButton.addEventListener('click', toggleModal);
    closeModalButton.addEventListener('click', toggleModal);
  }

  // Close modal when clicking outside of it
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', event => {
      if (event.target === modalBackdrop) {
        toggleModal();
      }
    });
  }

  // Function to show a notification message
  function showNotification(message, isSuccess = true) {
    let notification = document.getElementById('notification');
    if (!notification) {
      notification = document.createElement('div');
      notification.id = 'notification';
      notification.className = 'notification';
      document.body.appendChild(notification);
    }

    notification.textContent = message;
    notification.style.background = isSuccess ? '#3a8a5f' : 'rgb(217, 90, 90)';
    notification.classList.add('show');

    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }

  // Function to validate form inputs and checkboxes
  function validateForm(form) {
    let valid = true;
    const inputs = form.querySelectorAll('.form-input');
    const checkbox = form.querySelector('.form-checkbox');

    // Validate inputs
    inputs.forEach(input => {
      if (!input.checkValidity()) {
        input.classList.add('error');
        input.classList.remove('valid');
        valid = false;
      } else {
        input.classList.remove('error');
        input.classList.add('valid');
      }
    });

    // Validate checkbox
    if (checkbox) {
      const checkboxIcon = checkbox.nextElementSibling;
      if (!checkbox.checked) {
        checkbox.classList.add('error');
        checkboxIcon.style.border = '1px solid red';
        valid = false;
      } else {
        checkbox.classList.remove('error');
        checkboxIcon.style.border = 'none';
      }
    }

    return valid;
  }

  // Function to handle form submission
  async function submitForm(event, form) {
    event.preventDefault();

    if (!validateForm(form)) {
      showNotification('Please fill in all fields correctly!', false);
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // const response = await fetch('https://example.com/register', {
      //   method: 'POST',       
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });

      // if (!response.ok) throw new Error('Registration error');

      // Simulating a successful request
      await new Promise(resolve => setTimeout(resolve, 1000));
      // =========================================
      showNotification('Registration successful!', true);
      
      form.reset();

      // Reset input and checkbox styles after successful submission
      form
        .querySelectorAll('.form-input')
        .forEach(input => input.classList.remove('valid', 'error'));
      
      const checkbox = form.querySelector('.form-checkbox');
      if (checkbox) {
        checkbox.classList.remove('error');        
        checkbox.nextElementSibling.style.border = 'none';
      }

      if (form.classList.contains('registration-form-modal')) {
        toggleModal(); // Closing modal after successful submission
      }
    } catch (error) {
      showNotification(error.message, false);
    }
  }

  // Event listeners for real-time input validation
  document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => {
      if (input.checkValidity()) {
        input.classList.remove('error');
        input.classList.add('valid');
      } else {
        input.classList.remove('valid');
        input.classList.add('error');
      }
    });
  });

  // Event listeners for checkbox validation
  document.querySelectorAll('.form-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const checkboxIcon = checkbox.nextElementSibling;
      if (checkbox.checked) {
        checkbox.classList.remove('error');
        checkboxIcon.style.border = 'none';
      } else {
        checkbox.classList.add('error');
        checkboxIcon.style.border = '2px solid red';
      }
    });
  });

  // Add event listeners to form submissions
  if (formMain) {
    formMain.addEventListener('submit', event => submitForm(event, formMain));
  }

  if (formModal) {
    formModal.addEventListener('submit', event => submitForm(event, formModal));
  }

  // ========== TIMER ==========
  let timer;

  (() => {
    const compareDate = new Date(2025, 2, 1, 0, 0).getTime();

    // Function to update the countdown timer
    function updateTimer(prefix) {
      const difference = compareDate - Date.now();

      if (difference <= 0) {
        clearInterval(timer);
        document.getElementById(`${prefix}days`).textContent = '00';
        document.getElementById(`${prefix}hours`).textContent = '00';
        document.getElementById(`${prefix}minutes`).textContent = '00';
        document.getElementById(`${prefix}seconds`).textContent = '00';
        return;
      }

      const seconds = Math.floor(difference / 1000) % 60;
      const minutes = Math.floor(difference / (1000 * 60)) % 60;
      const hours = Math.floor(difference / (1000 * 60 * 60)) % 24;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));

      document.getElementById(`${prefix}days`).textContent = String(
        days
      ).padStart(2, '0');
      document.getElementById(`${prefix}hours`).textContent = String(
        hours
      ).padStart(2, '0');
      document.getElementById(`${prefix}minutes`).textContent = String(
        minutes
      ).padStart(2, '0');
      document.getElementById(`${prefix}seconds`).textContent = String(
        seconds
      ).padStart(2, '0');
    }

    // Function to start the countdown timer
    function startTimer() {
      updateTimer(''); // Main timer
      updateTimer('modal-'); // Timer in modal window
    }

    startTimer();
    timer = setInterval(startTimer, 1000);
  })();
});
