const { getDatabase, ref, push, update, remove, get, set } = require('@firebase/database');
const { getStorage } = require('@firebase/storage');

module.exports = {
    createItem: ({ path, params }) => {
        const db = getDatabase();
        if (!path) return { error: 'Sem path' }
        if(path.includes("undefined")) {
            console.log(path);
            return console.warn("Erro, undefined!")
        }
        push(ref(db, path), params).then(
            console.log("[LOG] Gravação no banco de dados")
        ).catch((error) => {
            console.warn(error);
        });
    },
    updateItem: ({ path, params }) => {
        const db = getDatabase();
        if (!path) return { error: 'Sem path' }
        if(path.includes("undefined")) {
            console.log(path);
            return console.warn("Erro, undefined!")
        }
        update(ref(db, path),
            params
        ).then(
            console.log("[LOG] Atualização no banco de dados")
        ).catch((error) => {
            console.log(error);
        });
    },
    setItem: ({ path, params }) => {
        const db = getDatabase();
        if (!path) return { error: 'Sem path' }
        if(path.includes("undefined")) {
            console.log(path);
            return console.warn("Erro, undefined!")
        }
        set(ref(db, path),
            params
        ).then(
            console.log("[LOG] Atualização no banco de dados")
        ).catch((error) => {
            console.log(error);
        });
    },
    deleteItem: ({ path }) => {
        const db = getDatabase();
        if (!path) return { error: 'Sem path' }
        if(path.includes("undefined")) {
            console.log(path);
            return console.warn("Erro, undefined!")
        }
        remove(ref(db, path))
            .then(
                console.log("[LOG] Remoção no banco de dados")
            ).catch((error) => {
                console.log(error);
            });
    },
    getAllItems: async ({ path }) => {
        const db = getDatabase();
        if (!path) return { error: 'Sem path' }
        if(path.includes("undefined")) {
            console.log(path);
            return console.warn("Erro, undefined!")
        }
        const snapshot = await get(ref(db, path))
        let alldata = [];
        snapshot.forEach(childSnapshot => {
            let key = childSnapshot.key,
                data = childSnapshot.val();
            alldata.push({ key, data })
        });
        return alldata;
    },
    getItems: async ({ path }) => {
        const db = getDatabase();
        if (!path) return { error: 'Sem path' }
        if(path.includes("undefined")) {
            console.log(path);
            return console.warn("Erro, undefined!")
        }
        const snapshot = await get(ref(db, path))
        return snapshot.val() || [];
    },
    uploadFile: ({ path, base64 }) => {
        const storage = getStorage();
        const storageRef = ref(storage, path);
        const url = uploadString(storageRef, base64, 'data_url').then((snapshot) => {
            return getDownloadURL(snapshot.ref).then((downloadURL) => {
                return downloadURL
            });
        })
        return url;
    }
}