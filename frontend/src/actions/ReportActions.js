import { ENDPOINT_URL } from "../constants/constat";
export const createReport=async (reportData) => {
  return fetch(`${ENDPOINT_URL}/report`,{
    method:'POST',
    headers:{
        Accept:'application/json',
    },
    body:reportData,
    credentials:'include'
    }).then((res)=>{
        return res.json()
    }).catch(err=>{
        console.log(err);
    })
}
export const getReport=async(id)=>{
    return fetch(`${ENDPOINT_URL}/report/${id}`,{
        method:'GET',
        headers:{
            Accept: 'application/json',
            'Content-Type':'application/json'
        },
        credentials:'include'
    }).then((res) => {
        return res.json();
    }).catch(err => {
        console.log(err);
    });
}
export const getUserReports = async () => {
    return fetch(`${ENDPOINT_URL}/report/user`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json'
        },
        credentials: 'include'
    }).then((res) => {
        return res.json();
    }).catch(err => {
        console.log(err);
    });
}
export const updateReport = async (reportId, updateData) => {
    return fetch(`${ENDPOINT_URL}/report/${reportId}`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
        credentials: 'include'
    }).then((res) => {
        return res.json();
    }).catch(err => {
        console.log(err);
    });
}

export const deleteReport = async (reportId) => {
    return fetch(`${ENDPOINT_URL}/report/${reportId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
        },
        credentials: 'include'
    }).then((res) => {
        return res.json();
    }).catch(err => {
        console.log(err);
    });
}
export const viewReport = async (reportId) => {
    return fetch(`${ENDPOINT_URL}/report/view/${reportId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
        credentials: 'include'
    }).then((res) => {
        if (res.ok) {
            return res.blob();
        } else {
            return res.json();
        }
    }).catch(err => {
        console.log(err);
    });
}
export const downloadReport = async (reportId) => {
    return fetch(`${ENDPOINT_URL}/report/download/${reportId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
        credentials: 'include'
    }).then((res) => {
        if (res.ok) {
            return res.blob();
        } else {
            return res.json();
        }
    }).catch(err => {
        console.log(err);
    });
}
