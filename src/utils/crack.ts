import { LicenseInfo, generateLicense } from "@mui/x-license-pro";
import moment from "moment";
const expiryDate = moment().add(1, "y").toDate();
const license = generateLicense({
  expiryDate,
  orderNumber: "hooy",
  licensingModel: "perpetual",
  scope: "premium",
});
LicenseInfo.setLicenseKey(license);
