import { initLanguage } from "./i18n/index.js";
import { initMotion } from "./features/motion.js";
import { initCertificates } from "./features/certificates.js";
import { initAudioPlayer } from "./audio/player.js";
import { initStamp } from "./features/stamp.js";

initLanguage();
initCertificates();
initMotion();
const audio = initAudioPlayer();
initStamp(audio);
