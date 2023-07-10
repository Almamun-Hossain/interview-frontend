import axios from 'axios'
export const getAllProducts = async () => {
     let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
     if (data) {
          return data;
     } else {
          return null;
     }
}