import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SettingsIcon from '@mui/icons-material/Settings';
import { Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { colors } from '../constants/color';

export default function ButtonAppBar() {
  const {t} = useTranslation()
  console.log(i18n.language)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: colors.dark.green}}>
        <Toolbar>
          <SportsSoccerIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, userSelect: "none" }}>
            Score Guesser
          </Typography>
          <Box>
            <Chip icon={<SportsSoccerIcon color="inherit"/>} label="123556" sx={{backgroundColor: colors.dark.primary, color: colors.dark.secondary, mr: 1, userSelect: "none"}}/>
            <Chip icon={<AccountCircle color="inherit"/>} label={t('register')} sx={{ backgroundColor: colors.dark.primary, color: colors.dark.secondary, mr: 1, userSelect: "none", cursor: "pointer"}}/>
            <Chip icon={<AccountCircle color="inherit"/>} label={t("login")} sx={{ backgroundColor: colors.dark.primary, color: colors.dark.secondary, mr: 1, userSelect: "none", cursor: "pointer"}}/>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              sx={{mr: 1}}
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="settings"
              aria-controls={"primary-search-settings-menu"}
              aria-haspopup="true"
              onClick={() => {}}
              color="inherit"
            >
              <SettingsIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
