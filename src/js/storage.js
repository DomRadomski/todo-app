class Storage {
    #storage;
    
    constructor() {
        if(!this.storageAvailable()) {throw new Error('Could not access local storage')}

        this.#storage = window.localStorage;
        
    }

    storageAvailable() {
        let storage;
        try {
            storage = window.localStorage;
            const x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
            );
        }
    }

    

    updateStorage(data, key="projects") {
        this.#storage.setItem(key, JSON.stringify(data));
    }

    jsonFromStorage(key="projects") {
        return JSON.parse(this.#storage.getItem("projects"));
    }

    logJSON(key = "projects") {
        const data = this.jsonFromStorage(key);

        if (!Array.isArray(data)) {
            console.log("Stored value is not an array:", data);
            return;
        }

        if (data.length === 0) {
            console.log("No data stored under key:", key);
            return;
        }

        console.log("================================")
        console.log(this.jsonFromStorage());
        console.log("================================")

        data.forEach((item, index) => {
            console.group(`Item ${index}`);
            console.log(item);
            console.log("Keys:", Object.keys(item));
            console.groupEnd();
        });
    }
}

export default Storage;

// localStorage.setItem("projects", JSON.stringify(projects));
