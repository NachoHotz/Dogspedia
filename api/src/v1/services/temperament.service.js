import axios from 'axios';
import TemperamentModel from '../../db/models/TemperamentModel.js';
import InternalServerException from '../exceptions/InternalServerException.js';
import { API_URL } from '../constants/endpoints.js';

export async function GetAllTemperaments(next) {
  try {
    const temperamentInDb = await TemperamentModel.findAll();

    if (temperamentInDb.length === 0) {
      const { data } = await axios.get(API_URL);

      // Creates a new array of arrays with every temperament from every breed
      let temperamentsList = data.map((breed) => breed.temperament?.split(', '));

      // Flattens the array and removes duplicates as well as undefined values
      temperamentsList = [...new Set(temperamentsList.flat(2))].filter(
        (temp) => temp !== undefined,
      );

      // Saves the temperaments in the database if they don't exist
      // eslint-disable-next-line no-restricted-syntax
      for (const temp of temperamentsList) {
        TemperamentModel.findOrCreate({ where: { name: temp } });
      }

      // Return the temperaments from the database
      return TemperamentModel.findAll();
    }
    return temperamentInDb;
  } catch (e) {
    return next(new InternalServerException(e.message));
  }
}
