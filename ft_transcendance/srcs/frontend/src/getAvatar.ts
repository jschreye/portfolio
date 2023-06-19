import axios from 'axios';
import router from './router';


export async function getAvatar(store: any, id: any) {//params token pas obligatoire, il se trouve dans le store
    try {
        const headers = {
            Authorization: `Bearer ${store.getters.getToken}`,
            'Access-Control-Allow-Origin': '*',
        };
        const response = await axios.get(`/users/avatar/${id}`, {
            headers,
            responseType: 'arraybuffer'
          });
        try{
            const blob = new Blob([response.data], { type: 'image/jpeg' });
            const url = URL.createObjectURL(blob);
            return url;    
        }catch(error){
            store.commit('setError', error);
            router.push('/error');
        }
    } catch (error) {
        store.commit('setError', error);
        router.push('/error');
    }
}
/*
export async function getAvatar(store: any, id: any) {
    try {
      const headers = {
        Authorization: `Bearer ${store.getters.getToken}`,
        'Access-Control-Allow-Origin': '*',
      };
      const response = await axios.get(`/users/avatar/${id}`, {
        headers,
        responseType: 'arraybuffer'
      });
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
      const url = `data:${response.headers['content-type']};base64,${base64}`;
      return url;
    } catch (error) {
      store.commit('setError', error);
      router.push('/error');
    }
  }
*/
export default getAvatar;