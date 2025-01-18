import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box
} from '@mui/material';

const ProfileSettings = () => {
  const { t } = useTranslation('settings');

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('settings.profile.title')}
        </Typography>
        
        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary">
            {t('settings.profile.save')}
          </Button>
          <Button variant="outlined">
            {t('settings.profile.cancel')}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings; 