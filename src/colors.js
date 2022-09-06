
const DARK = '#000';
const LIGHT = '#FFF';
const ERROR_BG = '#F5B7B1';
const ERROR_FG = '#C0392B';
const SUCCESS_BG = '#A9DFBF';
const SUCCESS_FG = '#229954';

const colors = {
  app: {
    backgroundColor: LIGHT,
    color: DARK
  },
  header: {
    backgroundColor: DARK,
    color: LIGHT
  },
  navLink: {
    active: {
      backgroundColor: LIGHT,
      color: DARK
    },
    inactive: {
      backgroundColor: DARK,
      color: LIGHT
    }
  },
  colorPicker: {
    backgroundColor: LIGHT,
    color: DARK
  },
  tabBar: {
    backgroundColor: DARK
  },
  tab: {
    active: {
      backgroundColor: LIGHT,
      color: DARK
    },
    inactive: {
      backgroundColor: DARK,
      color: LIGHT
    }
  },
  preview: {
    default: DARK
  },
  clipbaordInput: {
    backgroundColor: LIGHT,
    color: DARK
  },
  flashMessage: {
    error: {
      backgroundColor: ERROR_BG,
      color: ERROR_FG,
      borderColor: ERROR_FG
    },
    success: {
      backgroundColor: SUCCESS_BG,
      color: SUCCESS_FG,
      borderColor: SUCCESS_FG
    }
  },
  paletteCard: {
    backgroundColor: LIGHT,
    color: DARK,
    borderColor: DARK
  }
};

export default colors;