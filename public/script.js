document.addEventListener('DOMContentLoaded', async function () {
  const lotteryDateElement = document.getElementById('lottery-date');

  // Fetch the latest lottery date from the API on Railway
  try {
      const response = await fetch('/latest'); // เรียก API จากเซิร์ฟเวอร์ของคุณเอง
      const data = await response.json();
      console.log(data); // Log the response data for debugging

      // Assuming the response has a field named `date`
      if (data.date) {
          const lotteryDate = new Date(data.date);
          const formattedDate = lotteryDate.toLocaleDateString('th-TH', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
          });
          lotteryDateElement.textContent = `งวดวันที่: ${formattedDate}`;

          // Enable or disable the prediction form based on the current date
          const now = new Date();
          const cutoffTime = new Date(lotteryDate);
          cutoffTime.setHours(14, 30, 0); // Set cutoff time to 14:30 on the lottery date

          if (now > cutoffTime) {
              document.getElementById('prediction-form').innerHTML = '<p class="text-white">การทายผลปิดแล้วสำหรับงวดนี้</p>';
          }
      } else {
          lotteryDateElement.textContent = 'ไม่สามารถโหลดวันที่หวยออกได้';
      }
  } catch (error) {
      console.error('Error fetching the lottery date:', error);
      lotteryDateElement.textContent = 'ไม่สามารถโหลดวันที่หวยออกได้';
  }
});

document.getElementById('prediction-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const inputs = document.querySelectorAll('.otp-input');
  let number = '';
  inputs.forEach(input => {
      number += input.value;
  });

  const phoneNumber = document.getElementById('phone-number').value;

  try {
      const response = await fetch('/predict', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ number }),
      });

      const result = await response.json();

      document.getElementById('predicted-number').value = number;
      document.getElementById('phone-number-result').value = phoneNumber;

      $('#resultModal').modal('show');
  } catch (error) {
      console.error('Error:', error);
      alert('เกิดข้อผิดพลาดในการทายผล กรุณาลองใหม่อีกครั้ง');
  }
});

document.getElementById('close-button').addEventListener('click', function() {
  location.reload();
});
