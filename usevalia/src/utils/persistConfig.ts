import { PersistConfig } from "redux-persist/es/types";
import storage from "redux-persist/lib/storage";

const persistConfig: PersistConfig<any> = {
  key: "root",
  storage,
};

export default persistConfig;
