const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    },
    icon: path.join(__dirname, 'assets/icon.png'), // اختیاری: آیکون برنامه
    title: 'آوان حسابان - سیستم حسابداری جامع',
    show: false, // ابتدا پنهان نگه می‌داریم تا صفحه کاملاً لود شود
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default'
  });

  // بارگذاری برنامه
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    // باز کردن DevTools در حالت توسعه
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // نمایش پنجره پس از آماده شدن کامل
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // مدیریت بستن پنجره
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // تنظیم منوی برنامه
  createMenu();
}

function createMenu() {
  const template = [
    {
      label: 'فایل',
      submenu: [
        {
          label: 'جدید',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            // اضافه کردن عملکرد جدید
          }
        },
        {
          label: 'باز کردن',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            // اضافه کردن عملکرد باز کردن
          }
        },
        {
          label: 'ذخیره',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            // اضافه کردن عملکرد ذخیره
          }
        },
        { type: 'separator' },
        {
          label: 'خروج',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'ویرایش',
      submenu: [
        { role: 'undo', label: 'بازگردانی' },
        { role: 'redo', label: 'تکرار' },
        { type: 'separator' },
        { role: 'cut', label: 'برش' },
        { role: 'copy', label: 'کپی' },
        { role: 'paste', label: 'چسباندن' },
        { role: 'selectall', label: 'انتخاب همه' }
      ]
    },
    {
      label: 'نمایش',
      submenu: [
        { role: 'reload', label: 'بارگذاری مجدد' },
        { role: 'forcereload', label: 'بارگذاری مجدد اجباری' },
        { role: 'toggledevtools', label: 'ابزار توسعه‌دهنده' },
        { type: 'separator' },
        { role: 'resetzoom', label: 'بازنشانی زوم' },
        { role: 'zoomin', label: 'بزرگ‌نمایی' },
        { role: 'zoomout', label: 'کوچک‌نمایی' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'تمام صفحه' }
      ]
    },
    {
      label: 'پنجره',
      submenu: [
        { role: 'minimize', label: 'کمینه' },
        { role: 'close', label: 'بستن' }
      ]
    },
    {
      label: 'راهنما',
      submenu: [
        {
          label: 'درباره آوان حسابان',
          click: () => {
            // نمایش پنجره درباره برنامه
          }
        },
        {
          label: 'راهنمای استفاده',
          click: () => {
            // باز کردن راهنمای برنامه
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// آماده‌سازی برنامه
app.whenReady().then(createWindow);

// خروج از برنامه زمانی که همه پنجره‌ها بسته شوند
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// امنیت: جلوگیری از باز کردن پنجره‌های جدید
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (navigationEvent, navigationURL) => {
    navigationEvent.preventDefault();
  });
});