import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';

const ThemeSettings = () => {
  const { t } = useTranslation('settings');

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('settings.theme.title')}
        </Typography>
        
        <RadioGroup defaultValue="system">
          <FormControlLabel 
            value="light" 
            control={<Radio />} 
            label={t('settings.theme.light')} 
          />
          <FormControlLabel 
            value="dark" 
            control={<Radio />} 
            label={t('settings.theme.dark')} 
          />
          <FormControlLabel 
            value="system" 
            control={<Radio />} 
            label={t('settings.theme.system')} 
          />
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default ThemeSettings; 