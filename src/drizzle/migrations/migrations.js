// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import m0000 from "./0000_quiet_joystick.sql";
import m0002 from "./0002_hesitant_brother_voodoo.sql";
import journal from "./meta/_journal.json";

export default {
    journal,
    migrations: {
        m0000,
        m0002
    }
};
