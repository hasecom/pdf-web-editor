import { RGB, rgb } from "pdf-lib";

type parseColorWithOpacity = {
	color:string | undefined,
	defaultColor: { color: RGB; opacity: number };
}
const parseColorWithOpacity = ({color,defaultColor}:parseColorWithOpacity) => {
	if (!color) return defaultColor;
  if (color.startsWith('#')) {
    // 16進数のカラーコードの場合
    return {
      color: rgb(
        parseInt(color.slice(1, 3), 16) / 255,
        parseInt(color.slice(3, 5), 16) / 255,
        parseInt(color.slice(5, 7), 16) / 255
      ),
      opacity: 1, // 不透明度をデフォルトで1とする
    };
  } else if (color.startsWith('rgba')) {
    // rgbaの場合
    const rgba = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),\s*(\d*\.\d+|\d+)\)/);
    if (rgba) {
      return {
        color: rgb(
          parseInt(rgba[1], 10) / 255,
          parseInt(rgba[2], 10) / 255,
          parseInt(rgba[3], 10) / 255
        ),
        opacity: parseFloat(rgba[4]),
      };
    }
  }
  // どちらでもない場合のデフォルトカラー
  return defaultColor;
};
export default parseColorWithOpacity;