import { ENDPOINT_URL } from "../constants/constat";
export const registerUser=async (userDetails)=>{
  try {
    console.log(`Endur;=${ENDPOINT_URL}`);
    const res = await fetch(`${ENDPOINT_URL}/user/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userDetails)
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
}

export const loginUser=async (userDetails) => {
  try {
    const res = await fetch(`${ENDPOINT_URL}/user/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userDetails),
      credentials: 'include'
    });
    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
}

export const userDetails=async () => {
  return fetch(`${ENDPOINT_URL}/user/user-details`,{
    method:'GET',
    headers:{
        Accept:'application/json',
        'Content-type':'application/json'
    },
    credentials: 'include'
}).then((res)=>{
    return res.json()
}).catch(err=>{
    console.log(err);
})
}

export const logoutAct=async () => {
  return fetch(`${ENDPOINT_URL}/user/logout`,{
    method:'GET',
    headers:{
        Accept:'application/json',
        'Content-type':'application/json'
    },
    credentials: 'include'
}).then((res)=>{
    return res.json()
}).catch(err=>{
    console.log(err);
})
}