import { EAuthSignType } from "@/constants/EAuth.ts";
import { GoogleIcon, MicrosoftIcon, TIcon } from "@/icons";

export const signInSystemList: { icon: TIcon; type: EAuthSignType; enabled: boolean }[] = [
  { icon: MicrosoftIcon, type: EAuthSignType.MICROSOFT, enabled: false },
  { icon: GoogleIcon, type: EAuthSignType.GOOGLE, enabled: false },
];
