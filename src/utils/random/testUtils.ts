import { randomInt } from "@mui/x-data-grid-generator";

let idCounter = 0;
export const createRandomRow = () => {
  idCounter += 1;
  return {
    id: idCounter,
    id_debt: randomInt(250, 1000),
    contract: randomInt(1234534, 4356789),
    schedule_type: randomInt(1, 2),
  };
};
export const testRows = [createRandomRow(), createRandomRow()];
