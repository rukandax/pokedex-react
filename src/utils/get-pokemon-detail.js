import axios from "axios";

export default function getPokemonDetail(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(url);

      if (res?.data) {
        resolve(res.data);
      }
    } catch (err) {
      reject(err);
    }
  });
}
