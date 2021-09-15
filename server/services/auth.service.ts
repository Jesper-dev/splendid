import axios from 'axios'

const API_URL = "http://localhost:8080/api/auth";

class AuthService {
    login(username: string, password: string){
        return axios.post(API_URL + 'signin', {
            username, password
        })
        .then(res => {
            if(res.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(res.data))
            }

            return res.data;
        })
    }

    logout() {
        localStorage.removeItem('user')
    }

    register(username: string, name: string, password: string) {
        return axios.post(API_URL + 'signup', {
            username, name, password
        })
    }

    getCurrentUser() {
        const userStr = localStorage.getItem('user')
        if(userStr) return JSON.parse(userStr)

        return null;
    }
}

export default new AuthService();