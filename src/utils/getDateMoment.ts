import moment from "moment";

export default function getDateMoment(date: Date) {
  return moment(date).format("DD.MM.YYYY");
}
