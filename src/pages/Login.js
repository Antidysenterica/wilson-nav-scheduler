const logoPath = './assets/logo-icon.png';

const accountTypes = ['Guest', 'College', 'Graduate', 'Faculty', 'Staff'];

const initialForm = {
  email: 'student@gbox.adnu.edu.ph',
  password: 'password',
  fullName: '',
  registerEmail: '',
  birthday: '',
  schoolId: '',
  newPassword: '',
  confirmPassword: ''
};

const permissions = [
  {
    key: 'student',
    tone: 'blue',
    title: 'Guest / Student / Graduate',
    description: 'Search campus map, view room details, request appointment slots.',
    roles: ['Guest', 'College', 'Graduate']
  },
  {
    key: 'staff',
    tone: 'gold',
    title: 'Faculty / Staff',
    description: 'Set office hours, class hours, availability, and approval mode.',
    roles: ['Faculty', 'Staff']
  }
];

const appDefinition = {
  data() {
    return {
      screen: 'login',
      selectedAccount: 'Guest',
      accountTypes,
      permissions,
      form: { ...initialForm }
    };
  },
  methods: {
    showLogin() {
      this.screen = 'login';
    },
    showCreate() {
      this.screen = 'register';
    },
    selectAccount(type) {
      this.selectedAccount = type;
    },
    isPermissionSelected(item) {
      return item.roles.includes(this.selectedAccount);
    }
  },
  template: `
    <main v-if="screen === 'login'" class="screen login-screen">
      <div class="login-wrap">
        <div class="brand-lockup">
          <img :src="'${logoPath}'" alt="Wilson logo" />
          <span>WILSON</span>
        </div>

        <section class="card login-card" aria-label="Login form">
          <h1>Welcome back</h1>
          <p class="subtitle">Sign in to open maps and appointments.</p>

          <label class="field">
            <span>Email</span>
            <input v-model="form.email" type="email" autocomplete="email" />
          </label>

          <label class="field">
            <span>Password</span>
            <input v-model="form.password" type="password" autocomplete="current-password" />
          </label>

          <div class="login-actions">
            <button class="primary-btn" type="button">Log in</button>
            <button class="secondary-btn" type="button" @click="showCreate">Create account</button>
          </div>
        </section>
      </div>
    </main>

    <main v-else class="screen register-screen">
      <section class="card create-card" aria-label="Create account form">
        <h1>Create account</h1>

        <div class="form-grid">
          <label class="field field-wide">
            <span>Full Name</span>
            <input v-model="form.fullName" type="text" placeholder="Name" autocomplete="name" />
          </label>

          <label class="field field-wide">
            <span>Email</span>
            <input v-model="form.registerEmail" type="email" placeholder="Email" autocomplete="email" />
          </label>

          <label class="field">
            <span>Birthday</span>
            <input v-model="form.birthday" type="text" placeholder="MM / DD / YYYY" />
          </label>

          <label class="field">
            <span>School ID</span>
            <input v-model="form.schoolId" type="text" />
          </label>

          <label class="field">
            <span>Password</span>
            <input v-model="form.newPassword" type="password" autocomplete="new-password" />
          </label>

          <label class="field">
            <span>Confirm Password</span>
            <input v-model="form.confirmPassword" type="password" autocomplete="new-password" />
          </label>
        </div>

        <h2 class="section-title">Account Type</h2>
        <div class="account-tabs" role="tablist" aria-label="Account type">
          <button
            v-for="type in accountTypes"
            :key="type"
            type="button"
            role="tab"
            :aria-selected="selectedAccount === type"
            :class="{ active: selectedAccount === type }"
            @click="selectAccount(type)"
          >
            {{ type }}
          </button>
        </div>

        <button class="primary-btn register-btn" type="button" @click="showLogin">Register</button>
      </section>

      <aside class="card permissions-card" aria-label="Role permissions">
        <h2>Role permissions</h2>
        <div class="permission-list">
          <article
            v-for="item in permissions"
            :key="item.key"
            class="permission-note"
            :class="[item.tone, { selected: isPermissionSelected(item) }]"
          >
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </aside>
    </main>
  `
};

if (window.Vue) {
  Vue.createApp(appDefinition).mount('#app');
} else {
  document.getElementById('app').innerHTML = `
    <main class="screen login-screen">
      <div class="login-wrap">
        <div class="brand-lockup">
          <img src="${logoPath}" alt="Wilson logo" />
          <span>WILSON</span>
        </div>
        <section class="card login-card" aria-label="Login form">
          <h1>Welcome back</h1>
          <p class="subtitle">Sign in to open maps and appointments.</p>
          <label class="field"><span>Email</span><input type="email" value="${initialForm.email}" /></label>
          <label class="field"><span>Password</span><input type="password" value="${initialForm.password}" /></label>
          <div class="login-actions">
            <button class="primary-btn" type="button">Log in</button>
            <button class="secondary-btn" type="button">Create account</button>
          </div>
        </section>
      </div>
    </main>
  `;
}
