import React, { useEffect, useState } from 'react';
import { ToggleButton, Popover, SvgIconProps } from '@mui/material';
import { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';
import { SketchPicker, ColorResult } from 'react-color';
import { edtitorProps } from '@/types/common';
import { NextPage } from 'next';

interface edtitorColorProps extends Omit<edtitorProps, 'currentObject'> {
  target?: string;
  targetStyle: string;
  initColor: string;
  Icon: React.ElementType<SvgIconProps>;
}

const ColorPickerButton: NextPage<edtitorColorProps> = ({
  Icon,
  target,
  targetStyle,
  initColor,
  selectedPdfObjectId,
  setObjectSettingStatus,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedColor, setSelectedColor] = useState<string>(target ? target : initColor);

  useEffect(() => {
    setObjectSettingStatus(prevState =>
      prevState.map(item =>
        item.fieldId === selectedPdfObjectId
          ? { ...item, [targetStyle]: selectedColor }
          : item
      )
    );
  }, [selectedColor]);

  useEffect(() => {
    setSelectedColor(target ? target : initColor);
  }, [selectedPdfObjectId]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorChange = (color: ColorResult) => {
    const { r, g, b, a } = color.rgb;
    setSelectedColor(`rgba(${r}, ${g}, ${b}, ${a})`);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'color-popover' : undefined;

  // 色が白またはtransparentに近いかどうかを判定する関数
  const isColorCloseToWhiteOrTransparent = (color: string) => {
    if (color === 'transparent') return true;
    const rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
    if (rgba.length < 3) return false;
    const r = parseInt(rgba[0], 10);
    const g = parseInt(rgba[1], 10);
    const b = parseInt(rgba[2], 10);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 200; // 白に近いかどうかの閾値
  };

  const iconColor = isColorCloseToWhiteOrTransparent(selectedColor) ? '#000000' : selectedColor;

  return (
    <div>
      <ToggleButton
        value="color"
        aria-label="color"
        onClick={handleClick}
        sx={{
          color: target ? target : initColor,
        }}
      >
        <Icon style={{ color: iconColor }} />
        <ArrowDropDownIcon style={{ color: iconColor }} />
      </ToggleButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <SketchPicker color={selectedColor} onChange={handleColorChange} />
      </Popover>
    </div>
  );
};

export default ColorPickerButton;
