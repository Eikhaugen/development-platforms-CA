export function handleLogout(){
            localStorage.removeItem("token");
            localStorage.removeItem("uid");
    
            window.location.href = "/";
}