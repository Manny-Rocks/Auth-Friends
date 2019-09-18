import axios from 'axios';

function axiosWithAuth(){
    const token = localStorage.getItem('token');

    return axios.create({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
            // does that need to be `${token}`? or just plain token?
        },
    });
}

export default axiosWithAuth;