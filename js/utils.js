async function fetchTextFile(resourcePath) {
    const res = await fetch(resourcePath);

    if (!res.ok) {
        throw new Error(`Failed request. Status code: ${res.status}. Status text: '${res.statusText}'.`);
    }

    return res.text();
}

// Add 'delay' function to promise chain
Promise.prototype.delay = async function (ms) {
    const v = await this;
    return await new Promise(function (resolve) {
        setTimeout(resolve.bind(null, v), ms);
    });
}