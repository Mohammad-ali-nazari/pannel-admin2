document.addEventListener("DOMContentLoaded", () => {
    const imageInput = document.getElementById("imageInput");
    const blogImage = document.getElementById("blogImage");
    const editBlogForm = document.getElementById("editBlogForm");
    const titleInput = document.getElementById("titleInput");
    const descriptionInput = document.getElementById("descriptionInput");
  
    // 1. پیش نمایش تصویر انتخاب شده
    imageInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          blogImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  
    // 2. ارسال فرم
    editBlogForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      // 3. گرفتن محتوا از divهای contenteditable
      const title = titleInput.innerText.trim();
      const description = descriptionInput.innerText.trim();
  
      // 4. اعتبارسنجی ساده
      if (!title) {
        alert("لطفا تیتر بلاگ را وارد کنید.");
        titleInput.focus();
        return;
      }
      if (!description) {
        alert("لطفا توضیحات بلاگ را وارد کنید.");
        descriptionInput.focus();
        return;
      }
  
      // می‌تونی اینجا کد ارسال داده به سرور رو اضافه کنی (مثلاً با fetch)
      // برای نمونه فقط دیتا را لاگ می‌کنیم:
      console.log("تیتر بلاگ:", title);
      console.log("توضیحات بلاگ:", description);
  
      alert("تغییرات با موفقیت ذخیره شد!");
    });
  });
  