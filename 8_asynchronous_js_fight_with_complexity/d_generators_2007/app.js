var co = require('co');

/**
 * Emulate network connectivity
 */
function getDataPromise(url) {
    var stubs = {
        '/search?name=iPhone': 123,
        '/shopOffers?id=123': ['AppleStore', 'DNS']
    };

    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(stubs[url]);
        }, 1000);
    });
} 


var query = 'iPhone';

co(searchModelWithGenerator(query))
    .then(printShops);

function* searchModelWithGenerator(modelName) {
    var modelId = yield getModelId(modelName);
    var shops = yield getShops(modelId);
    return shops;
}

function getModelId (modelName) {
    return getDataPromise('/search?name=' + modelName);
}

function getShops(modelId) {
    return getDataPromise('/shopOffers?id=' + modelId)
}

function printShops(shops) {
    console.log(shops)
    shops.forEach(function (shopName) {
        console.log(query + ' есть в магазине ' + shopName);
    });
}
