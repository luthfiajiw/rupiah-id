export function PostData(type, userData) {
  let baseUrl = "http://10.10.10.240:8000/api/v1/";

  return new Promise((resolve, reject){

    fetch(baseUrl+type,{
      method: 'POST',
      
    })
  });
}
