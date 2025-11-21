function getCookie(name) {
    const cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        const cookiePair = cookieArr[i].split("=");
        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

function checkAuth() {
    // const userID = getCookie("userID");
    // const authLink = document.getElementById("authLink");

    // if (userID) {
    //     authLink.innerText = "Đăng xuất";
    //     authLink.href = "#"; 

    //     // Khi nhấp vào nút "Đăng xuất"
    //     authLink.addEventListener("click", function () {
    //         deleteCookie("userID");
    //         window.location.href = "/v1/sites/auth/login";  
    //     });
    // } else {
    //     authLink.innerText = "Đăng nhập";
    //     authLink.href = "/v1/sites/auth/login";
    // }
}

document.addEventListener("DOMContentLoaded", checkAuth);
