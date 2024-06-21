import * as React from 'react';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { styled } from '@mui/system';
import clsx from 'clsx';
import { Box, Input } from '@mui/material';

import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { HelperText, Label } from './form-control-utils';

export default function TimeFormControl({ id, value, label, multiline, errors }: { id: string, value?: string, label: string, multiline?: boolean, errors?: string[] }) {
    return (
        <FormControl key={id} defaultValue="" >
            <Box sx={{ display: 'flex', alignItems: 'flex-end', alignContent: 'top', width: 'full' }}>
                <AccessTimeOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <Label >{label}</Label>
            </Box>
            <Input id={id}
                type='time'
                name={id}
                placeholder={value}
                multiline={multiline}
                sx={{ width: '100%' }}
                defaultValue={value}
                error={!!errors}
            />
            <HelperText errors={errors} />
        </FormControl>
    );
}
