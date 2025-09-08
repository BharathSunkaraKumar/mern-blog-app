

const api = 'http://localhost:8000/api/auth/'

const register = async(userData) => {
    const res = await fetch(`${api}register`, {
        method: "POST",
        headers: {"content-type" : "application/json"},
        body: JSON.stringify(userData)
    })
    
    const data = await res.json()
    return data
}

const login = async(userData) => {
    const res = await fetch(`${api}login`, {
        method: "POST",
        headers: {"content-type" : "application/json"},
        body: JSON.stringify(userData)
    })
    const data = await res.json()
    if(data.token) {
        localStorage.setItem('user', JSON.stringify(data))
    }
    return data
}

const logout = () => {
    localStorage.removeItem("user")
}

const authServer = {
    register,
    login,
    logout,
}

export default authServer;