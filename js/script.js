window.addEventListener('load', function () {
    // نمودار بازدیدها
    const ctxVisits = document.getElementById('visitsChart');
    if (ctxVisits) {
      new Chart(ctxVisits.getContext('2d'), {
        type: 'line',
        data: {
          labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد'],
          datasets: [{
            label: 'بازدیدها',
            data: [120, 150, 180, 140, 170],
            backgroundColor: 'rgba(25, 118, 210, 0.2)',
            borderColor: 'rgba(25, 118, 210, 1)',
            borderWidth: 2,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { labels: { color: '#212121' } }
          },
          scales: {
            x: { ticks: { color: '#212121' } },
            y: { ticks: { color: '#212121' } }
          }
        }
      });
    }
  
    // نمودار فروش
    const ctxSales = document.getElementById('salesChart');
    if (ctxSales) {
      new Chart(ctxSales.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد'],
          datasets: [{
            label: 'فروش (میلیون تومان)',
            data: [20, 35, 30, 50, 45],
            backgroundColor: 'rgba(25, 118, 210, 0.7)'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { labels: { color: '#212121' } }
          },
          scales: {
            x: { ticks: { color: '#212121' } },
            y: { ticks: { color: '#212121' } }
          }
        }
      });
    }
  
    // نمودار دایره‌ای کاربران
    const ctxUsers = document.getElementById('usersPieChart');
    if (ctxUsers) {
      new Chart(ctxUsers.getContext('2d'), {
        type: 'pie',
        data: {
          labels: ['کاربران فعال', 'غیرفعال', 'مهمان'],
          datasets: [{
            label: 'وضعیت کاربران',
            data: [60, 25, 15],
            backgroundColor: [
              'rgba(25, 118, 210, 0.8)',
              'rgba(244, 67, 54, 0.8)',
              'rgba(255, 193, 7, 0.8)'
            ]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: { color: '#212121' }
            }
          }
        }
      });
    }
  
    // دکمه‌های ویرایش بلاگ - برای blog-list.html
    const editButtons = document.querySelectorAll('.Btn-edit');
    if (editButtons.length > 0) {
      editButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
          // فرض: آی‌دی هر بلاگ با index + 1 شبیه‌سازی می‌شه (مثلاً بلاگ 1، 2 و ...)
          const blogId = index + 1;
          window.location.href = `edit-blog.html?id=${blogId}`;
        });
      });
    }
  
    // بارگذاری اطلاعات بلاگ برای صفحه ویرایش - برای edit-blog.html
    if (window.location.pathname.includes('edit-blog.html')) {
      const urlParams = new URLSearchParams(window.location.search);
      const blogId = urlParams.get('id');
  
      if (blogId) {
        fetch(`https://your-api.com/blogs/${blogId}`)
          .then(response => response.json())
          .then(data => {
            document.getElementById('titleInput').value = data.title;
            document.getElementById('descriptionInput').value = data.description;
            document.getElementById('blogImage').src = data.imageUrl;
          });
  
        document.getElementById('editBlogForm').addEventListener('submit', function (e) {
          e.preventDefault();
  
          const title = document.getElementById('titleInput').value;
          const description = document.getElementById('descriptionInput').value;
          const image = document.getElementById('imageInput').files[0];
  
          const formData = new FormData();
          formData.append('title', title);
          formData.append('description', description);
          if (image) {
            formData.append('image', image);
          }
  
          fetch(`https://your-api.com/blogs/${blogId}`, {
            method: 'PUT',
            body: formData
          })
            .then(response => response.json())
            .then(data => {
              alert('بلاگ با موفقیت ویرایش شد');
              window.location.href = 'blog-list.html';
            })
            .catch(error => {
              console.error('Error:', error);
            });
        });
      }
    }
  });
  // برای صفحه افزودن بلاگ
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('addBlogForm');
  const blogImageInput = document.getElementById('blogImage');
  const previewImage = document.getElementById('previewImage');
  const successMessage = document.getElementById('successMessage');

  if (form) {
    blogImageInput.addEventListener('change', function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          previewImage.setAttribute('src', e.target.result);
          previewImage.style.display = 'block';
        }
        reader.readAsDataURL(file);
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      successMessage.style.display = 'block';
      setTimeout(() => {
        successMessage.style.display = 'none';
        form.reset();
        previewImage.style.display = 'none';
      }, 3000);
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("messageModal");
  const modalText = document.getElementById("modalMessageText");
  const closeButton = document.querySelector(".close-button");

  document.querySelectorAll(".view-btn").forEach(button => {
    button.addEventListener("click", (e) => {
      const messageDiv = e.target.closest(".message");
      const message = messageDiv.getAttribute("data-message") || "No message content.";
      modalText.textContent = message;
      modal.style.display = "block";
    });
  });

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
// Modal elements
const modal = document.getElementById("messageModal");
const modalText = document.getElementById("modalMessageText");
const closeButton = document.querySelector(".close-button");

// Open modal on button click
document.querySelectorAll(".view-btn").forEach(button => {
  button.addEventListener("click", () => {
    const message = button.closest(".message").dataset.message;
    modalText.textContent = message;
    modal.style.display = "flex";
  });
});

// Close modal on click
closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Filter and search
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const messages = document.querySelectorAll(".message");

function filterMessages() {
  const searchText = searchInput.value.toLowerCase();
  const status = statusFilter.value;

  messages.forEach(msg => {
    const sender = msg.querySelector(".sender").textContent.toLowerCase();
    const isRead = msg.classList.contains("read");
    const isUnread = msg.classList.contains("unread");

    const matchesStatus =
      status === "all" ||
      (status === "read" && isRead) ||
      (status === "unread" && isUnread);

    const matchesText = sender.includes(searchText);

    msg.style.display = matchesStatus && matchesText ? "grid" : "none";
  });
}

searchInput.addEventListener("input", filterMessages);
statusFilter.addEventListener("change", filterMessages);
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const statusFilter = document.getElementById("statusFilter");

  function filterMessages() {
    const searchValue = searchInput.value.toLowerCase();
    const filterValue = statusFilter.value;
    const rows = document.querySelectorAll(".user-row");

    rows.forEach(row => {
      const name = row.querySelector(".name").textContent.toLowerCase();
      const status = row.querySelector(".status").textContent;

      const matchesSearch = name.includes(searchValue);
      const matchesFilter = filterValue === "all" || status === filterValue;

      row.style.display = (matchesSearch && matchesFilter) ? "" : "none";
    });
  }

  if (searchInput && statusFilter) {
    searchInput.addEventListener("input", filterMessages);
    statusFilter.addEventListener("change", filterMessages);
  }

  document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", () => {
      const row = button.closest(".user-row");
      const name = row.querySelector(".name").textContent;
      const confirmed = confirm(`آیا از حذف "${name}" مطمئن هستید؟`);
      if (confirmed) {
        row.remove();
      }
    });
  });

  document.querySelectorAll(".edit-btn").forEach(button => {
    button.addEventListener("click", () => {
      alert("امکان ویرایش در نسخه آینده اضافه خواهد شد.");
    });
  });
});

