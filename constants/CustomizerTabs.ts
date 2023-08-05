export enum EditorTabsEnum {
  COLOR_PICKER = "colorpicker",
  FILE_PICKER = "filepicker",
  AIPICKER = "aipicker",
}

type Tab = {
  name: EditorTabsEnum;
  icon: string;
};

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
