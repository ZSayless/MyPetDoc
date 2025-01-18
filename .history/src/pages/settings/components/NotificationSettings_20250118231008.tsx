import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch
} from '@mui/material';

const NotificationSettings = () => {
  const { t } = useTranslation('settings');

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('settings.notification.title')}
        </Typography>
        
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label={t('settings.notification.enable')}
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label={t('settings.notification.sound')}
          />
          <FormControlLabel
            control={<Switch />}
            label={t('settings.notification.email')}
          />
        </FormGroup>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings; 