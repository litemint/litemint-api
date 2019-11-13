/*
 * Copyright (c) 2018-2019 Frederic Rezeau.
 * Copyright (c) 2018-2019 Litemint LLC.
 * This source code is licensed under the MIT license.
 * See the LICENSE file for more information.
 */

"use strict";

// Litemint API.
(function (namespace) {
    let apiKey; // API Key for server calls.

    namespace.endPoint = "https://api.litemint.com";

    namespace.validateToken = function (token, onlyFederated) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (request.readyState === 4 && request.status === 200) {
                    const response = JSON.parse(request.responseText);
                    if(response.error){
                        reject("Invalid Token");
                    }
                    else {
                        resolve(response);
                    }
                }
            }
            const purpose = token.substring(0, token.length - 16);
            const url = namespace.endPoint + "/.auth/validatetoken?token=" + token + "&purpose=" + purpose + (onlyFederated ? "" : "&type=weak");
            request.open("GET", url, true);
            request.send(null);
        });
    };

    namespace.submitScore = function (token, score, onlyFederated) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (request.readyState === 4 && request.status === 200) {
                    const response = JSON.parse(request.responseText);
                    if(response.error){
                        reject("Invalid Request");
                    }
                    else {
                        resolve(response);
                    }
                }
            }
            const purpose = token.substring(0, token.length - 16);
            const url = namespace.endPoint + "/.auth/submitscore?token=" + token + "&score=" + score + "&purpose=" + purpose + (onlyFederated ? "" : "&type=weak") + (apiKey ? "&key=" + apiKey : "");
            request.open("GET", url, true);
            request.send(null);
        });
    };

    namespace.getToken = function () {
        let getUrlParameter = function (search) {
            const url = decodeURIComponent(window.location.search.substring(1)), params = url.split('&');
            for (let i = 0; i < params.length; i++) {
                let name = params[i].split('=');
                if (name[0] === search) {
                    return name[1] === undefined ? true : name[1];
                }
            }
        };

        return new Promise((resolve, reject) => {
            if(!this.token) {
                this.token = getUrlParameter("token");
            }
            resolve(this.token);
        });
    };

    namespace.initialize = function (key) {
        apiKey = key;
        if (parent) {
            parent.postMessage("litemint_app_ready", "*");
        }
    };

    namespace.close = function () {
        if (parent) {
            parent.postMessage("litemint_app_close", "*");
        }
    };
    
})(window.Litemint = window.Litemint || {});
