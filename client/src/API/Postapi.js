
import axois from 'axios';
import axiosInstance from './Apiinterception';


export const LoginApi = (body) => {

    return new Promise((resolve, reject) => {
        
        axois.post('api', body)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};


export const HomeApi = () => {

    return new Promise((resolve, reject) => {
        
        axiosInstance.get('api')
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
};


export const createNewTripApi = (body) =>{
    return new Promise(async (resolve,reject)=>{
        await axiosInstance.post('api',body).then((res)=>{
            resolve.apply(res)
        }).then((error)=>{
            reject(error);
        })
    })
}