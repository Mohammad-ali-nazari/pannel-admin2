document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addUserForm");
    const userTable = document.querySelector(".user-table");
  
    const modal = document.getElementById("editUserModal");
    const editForm = document.getElementById("editUserForm");
    const editName = document.getElementById("editName");
    const editEmail = document.getElementById("editEmail");
    const editRole = document.getElementById("editRole");
    const editActive = document.getElementById("editActive");
    const cancelEditBtn = document.getElementById("cancelEdit");
  
    let currentEditingRow = null;
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const inputs = form.querySelectorAll("input, select");
      const name = inputs[0].value.trim();
      const email = inputs[1].value.trim();
      const role = inputs[2].value;
      const isActive = inputs[3].checked;
  
      if (!name || !email || !role) {
        alert("لطفا همه فیلدها را تکمیل کنید.");
        return;
      }
  
      const userRow = document.createElement("div");
      userRow.classList.add("user-row");
  
      userRow.innerHTML = `
        <div class="col name">${name}</div>
        <div class="col email">${email}</div>
        <div class="col role">${role}</div>
        <div class="col status"><input type="checkbox" ${isActive ? "checked" : ""}></div>
        <div class="col actions">
          <button class="edit-btn">ویرایش</button>
          <button class="delete-btn" title="حذف کاربر">🗑</button>
        </div>
      `;
  
      userTable.appendChild(userRow);
      form.reset();
      inputs[3].checked = true;
  
      addRowEventListeners(userRow);
    });
  
    function addRowEventListeners(row) {
      const deleteBtn = row.querySelector(".delete-btn");
      const editBtn = row.querySelector(".edit-btn");
      const statusCheckbox = row.querySelector(".status input[type=checkbox]");
  
      deleteBtn.addEventListener("click", () => {
        if (confirm("آیا مطمئن هستید که می‌خواهید این کاربر را حذف کنید؟")) {
          row.remove();
        }
      });
  
      editBtn.addEventListener("click", () => {
        currentEditingRow = row;
  
        editName.value = row.querySelector(".name").textContent;
        editEmail.value = row.querySelector(".email").textContent;
        editRole.value = row.querySelector(".role").textContent;
        editActive.checked = row.querySelector(".status input[type=checkbox]").checked;
  
        modal.style.display = "flex";
      });
  
      statusCheckbox.addEventListener("change", () => {
        if (statusCheckbox.checked) {
          row.style.opacity = "1";
        } else {
          row.style.opacity = "0.6";
        }
      });
  
      if (!statusCheckbox.checked) {
        row.style.opacity = "0.6";
      }
    }
  
    editForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!currentEditingRow) return;
  
      currentEditingRow.querySelector(".name").textContent = editName.value.trim();
      currentEditingRow.querySelector(".email").textContent = editEmail.value.trim();
      currentEditingRow.querySelector(".role").textContent = editRole.value;
      currentEditingRow.querySelector(".status input[type=checkbox]").checked = editActive.checked;
  
      currentEditingRow.style.opacity = editActive.checked ? "1" : "0.6";
  
      modal.style.display = "none";
    });
  
    cancelEditBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    // کلیک بیرون مودال هم بسته شود
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  
    document.querySelectorAll(".user-row").forEach(addRowEventListeners);
  });
  