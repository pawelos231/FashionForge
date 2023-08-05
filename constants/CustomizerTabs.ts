export enum EditorTabsEnum {
  COLOR_PICKER = "colorpicker",
  FILE_PICKER = "filepicker",
  AIPICKER = "aipicker",
}

type Tab = {
  name: EditorTabsEnum;
  icon: string;
};

export const DEFAULT_LOGO_DECAL = "/krzysiaPysk.png";
export const DEFAULT_FULL_DECAL = "/progf.jpg";

export const EditorTabs: Tab[] = [
  {
    name: EditorTabsEnum.COLOR_PICKER,
    icon: "/noimage.jpg",
  },
  {
    name: EditorTabsEnum.FILE_PICKER,
    icon: "/noimage.jpg",
  },
  {
    name: EditorTabsEnum.AIPICKER,
    icon: "/noimage.jpg",
  },
];

export type SingleDecalProperty = {
  stateProperty: string;
  filterTab: string;
};

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};
