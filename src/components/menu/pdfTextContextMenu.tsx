import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { NextPage } from 'next';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

type PdfTextContextMenuProps = {
  anchorEl:null | HTMLElement,
  handleClose:()=>void
}
const PdfTextContextMenu:NextPage<PdfTextContextMenuProps> = ({anchorEl,handleClose}) => {
  const open = Boolean(anchorEl);
  return (
    <StyledMenu
      id="pdfTextContext-customized-menu"
      MenuListProps={{
        'aria-labelledby': 'pdfTextContext-customized-button',
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose} disableRipple>
        <EditIcon />
        Edit
      </MenuItem>
      <MenuItem onClick={handleClose} disableRipple>
        <FileCopyIcon />
        Duplicate
      </MenuItem>
      <Divider sx={{ my: 0.5 }} />
      <MenuItem onClick={handleClose} disableRipple>
        <ArchiveIcon />
        Archive
      </MenuItem>
      <MenuItem onClick={handleClose} disableRipple>
        <MoreHorizIcon />
        More
      </MenuItem>
    </StyledMenu>
  );
}
export default PdfTextContextMenu;