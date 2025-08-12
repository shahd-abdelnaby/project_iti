
  // Notification function
  function showNotification(message, type = 'info') {
    const notificationContainer = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    let bgColor, textColor, icon;

    switch(type) {
      case 'success':
        bgColor = 'bg-green-500';
        textColor = 'text-white';
        icon = '<i class="fa-solid fa-check-circle mr-2"></i>';
        break;
      case 'error':
        bgColor = 'bg-red-500';
        textColor = 'text-white';
        icon = '<i class="fa-solid fa-exclamation-circle mr-2"></i>';
        break;
     
     
    }
    
    notification.className = `${bgColor} ${textColor} px-4 py-3 rounded-lg shadow-lg flex items-center transform transition-all duration-500 translate-x-full`;
    notification.innerHTML = `${icon}${message}`;
    notificationContainer.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        notificationContainer.removeChild(notification);
      }, 500);
    }, 5000);
  }

  document.getElementById('bookNowBtn').addEventListener('click', function() {
    const carType = document.getElementById('carTypeInput').value;
    const rentalPlace = document.getElementById('rentalPlace').value;
    const returnPlace = document.getElementById('returnPlace').value;
    const rentalDate = document.getElementById('rentalDate').value;
    const returnDate = document.getElementById('returnDate').value;
    
    if (!carType || carType === 'default') {
      showNotification('Please select a car type', 'error');
      return;
    }
    
    if (!rentalPlace || rentalPlace === 'Place of rental') {
      showNotification('Please select a rental place', 'error');
      return;
    }
    
    if (!returnPlace || returnPlace === 'Place of return') {
      showNotification('Please select a return place', 'error');
      return;
    }
    
    if (!rentalDate) {
      showNotification('Please select a rental date', 'error');
      return;
    }
    
    if (!returnDate) {
      showNotification('Please select a return date', 'error');
      return;
    }
    
    // Check if return date is after rental date
    if (new Date(returnDate) <= new Date(rentalDate)) {
      showNotification('Return date must be after rental date', 'error');
      return;
    }
    
    // If all validations pass, show success message
    showNotification('Booking successful! Your car has been reserved.', 'success');
    
    // Reset form after successful booking
    setTimeout(() => {
      document.getElementById('carTypeInput').value = 'default';
      document.getElementById('rentalPlace').value = 'Place of rental';
      document.getElementById('returnPlace').value = 'Place of return';
      document.getElementById('rentalDate').value = '';
      document.getElementById('returnDate').value = '';
      carImageElement.style.backgroundImage = `url('${carImages['default']}')`;
    }, 2000);
  });
 