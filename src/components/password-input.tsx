import { useState } from 'react';
import {
  IconButton,
  InputAdornment,
  TextField,
  type TextFieldProps
} from '@mui/material';
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
export function PasswordInput(props: TextFieldProps) {
  const [visible, setVisible] = useState(false);
  return (
    <TextField
      {...props}
      type={visible ? 'text' : 'password'}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlined fontSize="small" color="action" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={visible ? '隐藏密码' : '显示密码'}
                onClick={() => setVisible(!visible)}
                edge="end"
              >
                {visible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }
      }}
    />
  );
}
