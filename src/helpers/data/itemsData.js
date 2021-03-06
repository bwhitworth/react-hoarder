import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getItemsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/items.json?orderBy="uid"&&equalTo="${uid}"`)
    .then((response) => {
      const fbItems = response.data;
      const itemsArray = [];
      if (fbItems) {
        Object.keys(fbItems).forEach((fbId) => {
          fbItems[fbId].id = fbId;
          itemsArray.push(fbItems[fbId]);
        });
      }
      resolve(itemsArray);
    })
    .catch((err) => console.error('could not get items:', err));
});

const getSingleItem = (itemId) => axios.get(`${baseUrl}/items/${itemId}.json`);

const postNewItem = (newItemObject) => axios.post(`${baseUrl}/items.json`, newItemObject);

const deleteItem = (itemId) => axios.delete(`${baseUrl}/items/${itemId}.json`);

const putItem = (itemId, updatedItem) => axios.put(`${baseUrl}/items/${itemId}.json`, updatedItem);

export default {
  getItemsByUid,
  getSingleItem,
  postNewItem,
  deleteItem,
  putItem,
};
