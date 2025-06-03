document.addEventListener('DOMContentLoaded', () => {
    const passwordForm = document.getElementById('passwordForm');
    const profileForm = document.getElementById('profileForm');
    const themeSelector = document.getElementById('themeSelector');
  
    if (passwordForm) {
      passwordForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('✅ رمز عبور با موفقیت تغییر یافت.');
      });
    }
  
    if (profileForm) {
      profileForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('✅ اطلاعات پروفایل با موفقیت ذخیره شد.');
      });
    }
  
    if (themeSelector) {
      themeSelector.addEventListener('change', function () {
        const selectedTheme = themeSelector.value;
  
        document.body.classList.remove('theme-dark', 'theme-light', 'theme-blue');
        document.body.classList.add(`theme-${selectedTheme}`);
        localStorage.setItem('selectedTheme', selectedTheme);
  
        alert(`🎨 تم "${selectedTheme}" اعمال شد.`);
      });
  
      // در زمان بارگذاری، تم ذخیره‌شده را اعمال کن
      const savedTheme = localStorage.getItem('selectedTheme');
      if (savedTheme) {
        document.body.classList.add(`theme-${savedTheme}`);
        themeSelector.value = savedTheme;
      }
    }
  });
  