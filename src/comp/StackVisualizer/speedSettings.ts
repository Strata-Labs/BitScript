export enum SpeedSettingEnum {
  "SLOW" = "SLOW",
  "NORMAL" = "NORMAL",
  "FAST" = "FAST",
}

type SpeedSettingType = {
  title: string;
  multiplier: number;
};

type SpeedSettingDataType = {
  [key in SpeedSettingEnum]: SpeedSettingType;
};

export const SpeedSettingData: SpeedSettingDataType = {
  [SpeedSettingEnum.FAST]: {
    title: "Fast",
    multiplier: 1.5,
  },
  [SpeedSettingEnum.NORMAL]: {
    title: "Normal",
    multiplier: 1.25,
  },
  [SpeedSettingEnum.SLOW]: {
    title: "Slow",
    multiplier: 1,
  },
};
