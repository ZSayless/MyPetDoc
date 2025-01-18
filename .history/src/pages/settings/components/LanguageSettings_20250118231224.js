import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  Select,
  MenuItem
} from '@mui/material';

const LanguageSettings = () => {
  const { t, i18n } = useTranslation('settings');

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('settings.language.title')}
        </Typography>
        
        <FormControl fullWidth>
          <Select
            value={i18n.language}
            onChange={handleLanguageChange}
            displayEmpty
          >
            <MenuItem value="en">{t('settings.language.english')}</MenuItem>
            <MenuItem value="vi">{t('settings.language.vietnamese')}</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default LanguageSettings; 