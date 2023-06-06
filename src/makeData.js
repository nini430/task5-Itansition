import { faker } from "@faker-js/faker";
import seedRandom from "seedrandom";

import countriesData from "./countries.json";
import { randExec } from "./utils/functions";

const modifyData = (record, n, prng) => {
  record.splice(0, 2);
  for (let i = 0; i < n; i++) {
    const index = Math.floor(prng() * record.length);
    record[index] = randExec(record[index], prng);
  }

  return record;
};

const organizeData = (record, errorLength, prng) => {
  const recordKeys = Object.keys(record);
  let recordValues = Object.values(record);

  const records = modifyData(recordValues, errorLength, prng);
  recordValues = Object.values(record).slice(0, 2).concat(records);
  recordValues.forEach((item, index) => {
    record[recordKeys[index]] = item;
  });

  return record;
};

export const makeData = (seed, countries, errorLength, start, end) => {
  faker.seed(seed);
  let index = start;
  let users = [];
  let probabilityArr = [];

  for (let i = start; i < end; i++) {
    const prng = seedRandom(seed);
    const prng1 = seedRandom(`country${i}`);
    index++;
    const country = countries[Math.floor(prng1() * countries.length)];
    const locale = countriesData.find((c) => c.name === country).locale;
    faker.setLocale(locale);

    const record = {
      index,
      random_identifier: faker.datatype.uuid(),
      fullName:
        faker.name.firstName() +
        " " +
        faker.name.middleName() +
        " " +
        faker.name.lastName(),
      address: faker.helpers.arrayElement([
        faker.address.countryCode() +
          " " +
          faker.address.city() +
          " " +
          faker.address.zipCode(),
        faker.address.state() +
          " " +
          faker.address.cityName() +
          " " +
          faker.address.street(),
        faker.address.buildingNumber() +
          " " +
          faker.address.street() +
          " " +
          faker.address.buildingNumber(),
      ]),
      phone: faker.helpers.arrayElement([
        faker.phone.number("###-###-###"),
        faker.phone.number("+## ## ### ## ##"),
      ]),
    };

    if (errorLength === 0.5) {
      if (probabilityArr.length + 1 !== 2) {
        probabilityArr.push(record);
      } else {
        probabilityArr.push(record);
        const randIndex = Math.floor(prng() * probabilityArr.length);
        probabilityArr[randIndex] = organizeData(probabilityArr[randIndex]);
        users.push(...probabilityArr);
        probabilityArr = [];
      }
    } else {
      const modifiedRecord = organizeData(record, errorLength, prng);
      users.push(modifiedRecord);
    }
  }

  return users;
};
