import { useTranslation } from 'react-i18next';
import { Container, Typography, Box } from '@mui/material';
import LanguageSettings from './components/LanguageSettings';
import ThemeSettings from './components/ThemeSettings';
import NotificationSettings from './components/NotificationSettings';
import ProfileSettings from './components/ProfileSettings';

const Settings = () => {
  const { t } = useTranslation('settings');

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('settings.title')}
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <LanguageSettings />
        </Box>
        
        <Box sx={{ mt: 4 }}>
          <ThemeSettings />
        </Box>
        
        <Box sx={{ mt: 4 }}>
          <NotificationSettings />
        </Box>
        
        <Box sx={{ mt: 4 }}>
          <ProfileSettings />
        </Box>
      </Box>
    </Container>
  );
};

export default Settings; 