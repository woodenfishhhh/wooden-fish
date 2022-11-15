const loginContainer = document.querySelector('.login-container');
const registerContainer = document.querySelector('.register-container');
const header = document.querySelector('.header');
const container = document.querySelector('.container');
const merits = document.querySelector('.merits');
const meritsSpan = document.querySelector('.merits-1');
const stick = document.querySelector('.stick');

const loginForm = document.querySelector('.login-form');
const registerForm = document.querySelector('.register-form');

const loginBtn = document.querySelector('.login-btn');
const registerBtn = document.querySelector('.register-btn');
const logOut = document.querySelector('.logout');
const woodenfish = document.querySelector('.woodenfish-container');

let meritsTimer, stickTimer;

// 注册
registerBtn.addEventListener('click', function () {
  const data = new FormData(registerForm);
  const name = data.get('register-name');
  const psw = data.get('register-psw');
  const checkPsw = data.get('register-check-psw');

  if (!name) {
    alert('用户名不能为空！');
    return;
  }
  if (!psw) {
    alert('密码不能为空！');
    return;
  }
  if (checkPsw !== psw) {
    alert('密码不一致！');
    return;
  }

  const user = {
    username: name,
    password: psw,
    meritsNum: 0
  }
  const userJSON = JSON.stringify(user)
  localStorage.setItem('WFUser', userJSON);

  registerForm.reset();
  registerContainer.classList.add('hidden');
  loginContainer.classList.remove('hidden');
});

// 登录
loginBtn.addEventListener('click', function () {
  const data = new FormData(loginForm);
  const name = data.get('login-name');
  const psw = data.get('login-psw');

  const userJSON = localStorage.getItem('WFUser');
  const { username, password, meritsNum } = JSON.parse(userJSON);

  if (username !== name || password !== psw) {
    alert('用户名或密码错误！');
    return;
  }

  loginForm.reset();
  merits.textContent = `功德：${meritsNum}`;
  loginContainer.classList.add('hidden');
  header.classList.remove('hidden');
  container.classList.remove('hidden');
});

logOut.addEventListener('click', function () {
  loginContainer.classList.remove('hidden');
  header.classList.add('hidden');
  container.classList.add('hidden');
});

woodenfish.addEventListener('click', function () {
  const userJSON = localStorage.getItem('WFUser');
  const user = JSON.parse(userJSON);

  // 功德++
  user.meritsNum++;

  merits.textContent = `功德：${user.meritsNum}`;
  const newUserJSON = JSON.stringify(user)
  localStorage.setItem('WFUser', newUserJSON);
  meritsSpan.classList.remove('hidden');
  stick.style.transform = 'rotate(45deg)';

  if (meritsTimer) clearTimeout(meritsTimer);
  if (stickTimer) clearTimeout(stickTimer);

  meritsTimer = setTimeout(() => {
    meritsSpan.classList.add('hidden');
  }, 800);

  stickTimer = setTimeout(() => {
    stick.style.transform = 'rotate(0deg)';
  }, 100);
})

const init = function () {
  const userJSON = localStorage.getItem('WFUser');
  const { meritsNum } = JSON.parse(userJSON);
  merits.textContent = `功德：${meritsNum ? meritsNum : 0}`;
}

init();