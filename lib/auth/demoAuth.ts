export type DemoAccountType =
  | "Healthcare Professional"
  | "Healthcare Facility"
  | "Master Admin"
  | "Kivara Admin";

export type DemoSession = {
  uid: string;
  email: string;
  fullName: string;
  accountType: DemoAccountType;
  createdAt: string;
};

const SESSION_KEY = "kivara.demo.auth.v1";
const USERS_KEY = "kivara.demo.users.v1";

export const DEMO_ACCOUNTS: Array<
  DemoSession & { password: string; note: string }
> = [
  {
    uid: "demo-cna",
    email: "cna@kivara.demo",
    password: "demo1234",
    fullName: "Jordan Miles",
    accountType: "Healthcare Professional",
    createdAt: "2026-01-01T00:00:00.000Z",
    note: "Opens the CNA mobile app",
  },
  {
    uid: "demo-facility",
    email: "facility@kivara.demo",
    password: "demo1234",
    fullName: "Sarah Johnson",
    accountType: "Healthcare Facility",
    createdAt: "2026-01-01T00:00:00.000Z",
    note: "Opens the Facility mobile app",
  },
  {
    uid: "demo-admin",
    email: "admin@kivara.demo",
    password: "demo1234",
    fullName: "Kivara Admin",
    accountType: "Master Admin",
    createdAt: "2026-01-01T00:00:00.000Z",
    note: "Opens admin MFA, then the Master Dashboard",
  },
];

function canUseStorage() {
  return typeof window !== "undefined" && !!window.localStorage;
}

function readUsers(): Array<DemoSession & { password: string }> {
  if (!canUseStorage()) return [];
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users: Array<DemoSession & { password: string }>) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getDemoSession(): DemoSession | null {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DemoSession;
  } catch {
    return null;
  }
}

export function setDemoSession(session: DemoSession) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearDemoSession() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(SESSION_KEY);
}

export function portalForAccountType(accountType: string): string {
  if (accountType === "Healthcare Professional") return "/cna";
  if (accountType === "Healthcare Facility") return "/facility";
  if (accountType === "Master Admin" || accountType === "Kivara Admin") {
    return "/login/mfa";
  }
  return "/";
}

export function registerDemoAccount(input: {
  email: string;
  password: string;
  fullName: string;
  accountType: DemoAccountType;
}): DemoSession {
  const email = input.email.trim().toLowerCase();
  const fullName = input.fullName.trim();
  if (!fullName) throw new Error("Enter your full name.");
  if (!email || !email.includes("@")) throw new Error("Enter a valid email.");
  if (input.password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }
  if (!input.accountType) throw new Error("Select an account type.");

  const existing = [
    ...DEMO_ACCOUNTS.map(({ password: _p, note: _n, ...rest }) => rest),
    ...readUsers(),
  ];
  if (existing.some((user) => user.email.toLowerCase() === email)) {
    throw new Error("An account with that email already exists. Try logging in.");
  }

  const session: DemoSession & { password: string } = {
    uid: `local-${Date.now()}`,
    email,
    password: input.password,
    fullName,
    accountType: input.accountType,
    createdAt: new Date().toISOString(),
  };

  const users = readUsers();
  users.push(session);
  writeUsers(users);

  const { password: _password, ...publicSession } = session;
  setDemoSession(publicSession);
  return publicSession;
}

export function loginDemoAccount(email: string, password: string): DemoSession {
  const normalized = email.trim().toLowerCase();
  if (!normalized || !password) {
    throw new Error("Enter both email and password.");
  }

  const seeded = DEMO_ACCOUNTS.find(
    (account) => account.email === normalized && account.password === password
  );
  if (seeded) {
    const { password: _password, note: _note, ...session } = seeded;
    setDemoSession(session);
    return session;
  }

  const local = readUsers().find(
    (user) =>
      user.email.toLowerCase() === normalized && user.password === password
  );
  if (!local) {
    throw new Error(
      "Email or password is incorrect. Use a demo account below, or create one first."
    );
  }

  const { password: _password, ...session } = local;
  setDemoSession(session);
  return session;
}

export async function withAuthTimeout<T>(
  promise: Promise<T>,
  ms = 4000
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timer = setTimeout(
          () =>
            reject(new Error("Auth is taking too long. Using demo sign-in.")),
          ms
        );
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}
