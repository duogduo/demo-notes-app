import { AuthStack } from "./stacks/AuthStack";
import { ApiStack } from "./stacks/ApiStack";
import { SSTConfig } from "sst";
import { StorageStack } from "./stacks/StorageStack";

export default {
  config(_input) {
    return {
      name: "notes",
      region: "us-east-1",
    };
  },
stacks(app) {
  app.stack(StorageStack).stack(ApiStack).stack(AuthStack);
},
} satisfies SSTConfig;