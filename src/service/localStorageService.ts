import { openDB } from 'idb';
import { IUserData } from '../@types/model/auth/user/userData';
import { IUserToken } from '../@types/model/auth/userToken/userToken';

const SESSION_NAME = 'nm-session';
const SESSION_KEY = 'nm-session-token';
const USER_DATA_NAME = 'nm-user-data';
const USER_DATA_KEY = 'nm-user-data-key';

let sessionCallback : (userToken : IUserToken | null) => void;
let userDataCallback : (userData : IUserData | null) => void;

export async function getLocalStorageSession() : Promise<IUserToken | null> {
    let session : IUserToken | null = null;
    if (indexedDB) {
        session = await getSessionIndexedDB();
    } else if (localStorage) {
        session = getSessionLocalStorage();
    }

    if (session) return session;

    return null;
}

export async function getLocalStorageUserData() : Promise<IUserData | null> {
    let userData : IUserData | null = null;
    let session : IUserToken | null = null;
    if (indexedDB) {
        userData = await getUserDataIndexedDB();
        session = await getSessionIndexedDB();
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    } else if (localStorage) {
        userData = getUserDataLocalStorage();
        session = getSessionLocalStorage();
    }

    if (userData?.userId === session?.userId) return userData;

    return null;
}

export async function setLocalStorageSession(userToken : IUserToken | null) : Promise<void> {
    if (indexedDB) {
        await setSessionIndexedDB(userToken);
    } else if (localStorage) {
        setSessionLocalStorage(userToken);
    }

    if (sessionCallback) {
        sessionCallback(userToken);
    }
}

export async function setLocalStorageUserData(userData : IUserData | null) : Promise<void> {
    if (indexedDB) {
        await setUserDataIndexedDB(userData);
    } else if (localStorage) {
        setUserDataLocalStorage(userData);
    }

    if (userDataCallback) {
        userDataCallback(userData);
    }
}

function setSessionLocalStorage(userToken : IUserToken | null) : void {
    if (userToken) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(userToken));
    } else {
        localStorage.removeItem(SESSION_KEY);
    }
}

function setUserDataLocalStorage(userData : IUserData | null) : void {
    if (userData) {
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    } else {
        localStorage.removeItem(USER_DATA_KEY);
    }
}

function getSessionLocalStorage() : IUserToken | null {
    const session = localStorage.getItem(SESSION_KEY);

    if (session) return JSON.parse(session);

    return null;
}

function getUserDataLocalStorage() : IUserData | null {
    const userData = localStorage.getItem(USER_DATA_KEY);

    if (userData) return JSON.parse(userData);

    return null;
}

/**
 * Sets the auth session. If no session is specified, deletes the existing entry.
 * @param userToken The session.
 */
async function setSessionIndexedDB(userToken : IUserToken | null) : Promise<void> {
    const db = await openDB(INDEXEDDBNAME, Number(INDEXEDDBVERSION));

    const tx = db.transaction(SESSION_NAME, 'readwrite');

    const store = tx.objectStore(SESSION_NAME);

    await store.delete(SESSION_KEY);
    if (userToken) {
        await store.add(userToken, SESSION_KEY);
    }
}

/**
 * Sets the user data. If no user data is specified, deletes the existing entry.
 * @param userData The user data.
 */
async function setUserDataIndexedDB(userData : IUserData | null) : Promise<void> {
    const db = await openDB(INDEXEDDBNAME, Number(INDEXEDDBVERSION));

    const tx = db.transaction(USER_DATA_NAME, 'readwrite');

    const store = tx.objectStore(USER_DATA_NAME);

    await store.delete(USER_DATA_KEY);
    if (userData) {
        await store.add(userData, USER_DATA_KEY);
    }
}

/**
 * Opens the DB and retrieves the current auth session.
 */
async function getSessionIndexedDB() : Promise<IUserToken> {
    const db = await openDB(INDEXEDDBNAME, Number(INDEXEDDBVERSION));

    const tx = db.transaction(SESSION_NAME, 'readonly');

    const result = await tx.objectStore(SESSION_NAME).get(SESSION_KEY);

    return result;
}

/**
 * Opens the DB and retrieves the current user data.
 */
async function getUserDataIndexedDB() : Promise<IUserData> {
    const db = await openDB(INDEXEDDBNAME, Number(INDEXEDDBVERSION));

    const tx = db.transaction(USER_DATA_NAME, 'readonly');

    const result = await tx.objectStore(USER_DATA_NAME).get(USER_DATA_KEY);

    return result;
}

/**
 * Specifies the callback that will be fired whenever the auth session undergoes a change.
 * @param callback
 */
export async function onSessionChanged(callback : (userToken : IUserToken | null) => void) : Promise<void> {
    sessionCallback = callback;
    if (indexedDB) {
        indexedDBSessionChange();
    } else if (localStorage) {
        const session = getSessionLocalStorage();
        sessionCallback(session);
    }
}

/**
 * Specifies the callback that will be fired whenever the user data undergoes a change.
 * @param callback
 */
export async function onUserDataChanged(callback : (userData : IUserData | null) => void) : Promise<void> {
    userDataCallback = callback;
    if (indexedDB) {
        indexedDBUserDataChange();
    } else if (localStorage) {
        const userData = getUserDataLocalStorage();
        userDataCallback(userData);
    }
}

/**
 * Retrieves auth session, and once done fires the session callback.
 */
function indexedDBSessionChange() : void {
    getSessionIndexedDB().then((res) => {
        sessionCallback(res);
    }, () => {
        sessionCallback(null);
    });
}

/**
 * Retrieves user data, and once done fires the user data callback.
 */
function indexedDBUserDataChange() : void {
    getUserDataIndexedDB().then((res) => {
        userDataCallback(res);
    }, () => {
        userDataCallback(null);
    });
}